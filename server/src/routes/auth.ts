import { Elysia, t } from "elysia";
import { jwtConfig } from "../jwt.config";
import AUTH_MESSAGES, { Language } from "../constants/auth";
import { User } from "../models/User";
import { RefreshToken } from "../models/RefreshToken";
import config from "../../config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Country } from "../models/Country";
import crypto from "crypto";

const signInSchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String(),
  rememberMe: t.Boolean(),
});

const signUpSchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 }),
  confirmPassword: t.String({ minLength: 8 }),
  firstName: t.String({ minLength: 2 }),
  lastName: t.String({ minLength: 2 }),
  phoneNumber: t.String({ pattern: "^[0-9\\s\\-()]+$" }),
  phoneCountryId: t.Number(),
});

const refreshTokenSchema = t.Object({
  refreshToken: t.String(),
});

const generateRefreshToken = () => crypto.randomBytes(64).toString('hex');

const createTokens = async (userId: string, rememberMe: boolean, thinknote: any) => {
  const refreshTokenExpiry = rememberMe ? 30 : 7;
  
  const accessToken = await thinknote.sign({ 
    id: userId,
    exp: Math.floor(Date.now() / 1000) + (rememberMe ? 604800 : 86400)
  });
  
  const refreshToken = generateRefreshToken();
  
  await RefreshToken.create({
    userId,
    token: refreshToken,
    expiresAt: new Date(Date.now() + refreshTokenExpiry * 24 * 60 * 60 * 1000)
  });
  
  return {
    accessToken,
    refreshToken,
    maxAge: rememberMe ? 604800 : 86400
  };
};

const getLanguage = (acceptLanguageHeader?: string): Language => {
  const languageCode = acceptLanguageHeader?.split(",")[0]?.split("-")[0] || config.language.default;
  return (languageCode in AUTH_MESSAGES ? languageCode : config.language.default) as Language;
};

const authRouter = new Elysia({ prefix: "/auth" })
  .use(jwtConfig)
  .post(
    "/sign-in",
    async ({ body, error, headers, thinknote }) => {
      const language = getLanguage(headers["accept-language"]);
      
      const user = await User.findOne({ email: body.email }).select('+password');
      
      if (!user) {
        return error(401, {
          status: false,
          message: AUTH_MESSAGES[language].INVALID_CREDENTIALS,
        });
      }
      
      const isPasswordValid = await bcrypt.compare(body.password, user.password);
      
      if (!isPasswordValid) {
        return error(401, {
          status: false,
          message: AUTH_MESSAGES[language].INVALID_CREDENTIALS,
        });
      }
      
      const country = await Country.findOne({ code: user.phoneCountryCode });
      const tokens = await createTokens(user._id.toString(), body.rememberMe, thinknote);
      
      return {
        status: true,
        message: AUTH_MESSAGES[language].SIGN_IN_SUCCESS,
        data: {
          ...tokens,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            phoneCountryId: country?.id || null,
            phoneCountryCode: user.phoneCountryCode,
          }
        }
      };
    },
    {
      body: signInSchema,
      detail: {
        tags: ["Auth"],
      },
    }
  )
  .post(
    "/sign-up",
    async ({ body, error, headers, thinknote }) => {
      const language = getLanguage(headers["accept-language"]);
      
      if (body.password !== body.confirmPassword) {
        return error(400, {
          status: false,
          message: AUTH_MESSAGES[language].PASSWORDS_DO_NOT_MATCH,
        });
      }
      
      const existingUser = await User.findOne({ email: body.email });
      
      if (existingUser) {
        return error(400, {
          status: false,
          message: AUTH_MESSAGES[language].USER_ALREADY_FOUND,
        });
      }
      
      const session = await mongoose.startSession();
      session.startTransaction();
      
      try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        
        const phoneCountry = await Country.findOne({ id: body.phoneCountryId });
        
        const [newUser] = await User.create([{
          email: body.email,
          password: hashedPassword,
          firstName: body.firstName,
          lastName: body.lastName,
          phoneNumber: body.phoneNumber,
          phoneCountryCode: phoneCountry?.code,
          isEmailVerified: false,
        }], { session });
        
        const tokens = await createTokens(newUser._id.toString(), false, thinknote);
        
        await session.commitTransaction();
        
        return {
          status: true,
          message: AUTH_MESSAGES[language].SIGN_UP_SUCCESS,
          data: {
            ...tokens,
            user: {
              id: newUser._id,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              phoneNumber: newUser.phoneNumber,
              phoneCountryId: body.phoneCountryId,
              phoneCountryCode: phoneCountry?.code || '',
            }
          },
        };
      } catch (err) {
        await session.abortTransaction();
        
        return error(500, {
          status: false,
          message: AUTH_MESSAGES[language].PROBLEM_CREATING_USER,
        });
      } finally {
        session.endSession();
      }
    },
    {
      body: signUpSchema,
      detail: {
        tags: ["Auth"],
      },
    }
  )
  .post(
    "/refresh-token",
    async ({ body, error, headers, thinknote }) => {
      const language = getLanguage(headers["accept-language"]);
      
      const storedToken = await RefreshToken.findOne({ 
        token: body.refreshToken,
        expiresAt: { $gt: new Date() }
      });
      
      if (!storedToken) {
        return error(401, {
          status: false,
          message: AUTH_MESSAGES[language].INVALID_REFRESH_TOKEN,
        });
      }
      
      await RefreshToken.deleteOne({ _id: storedToken._id });
      
      const user = await User.findById(storedToken.userId);
      
      if (!user) {
        return error(401, {
          status: false,
          message: AUTH_MESSAGES[language].USER_NOT_FOUND,
        });
      }
      
      const country = await Country.findOne({ code: user.phoneCountryCode });
      const tokens = await createTokens(user._id.toString(), false, thinknote);
      
      return {
        status: true,
        message: AUTH_MESSAGES[language].TOKEN_REFRESHED,
        data: {
          ...tokens,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            phoneCountryId: country?.id || null,
            phoneCountryCode: user.phoneCountryCode,
          }
        }
      };
    },
    {
      body: refreshTokenSchema,
      detail: {
        tags: ["Auth"],
      },
    }
  );

export default authRouter;