import { Elysia } from "elysia";
import { TokenUtil } from "../utils/token.util";
import { User } from "../models/user.model";
import { IUserDocument } from "../types/auth.types";
import { HydratedDocument } from "mongoose";

export const authMiddleware = new Elysia().derive(async ({ headers, set }) => {
  const authHeader = headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    set.status = 401;
    throw new Error("Unauthorized");
  }

  const token = authHeader.substring(7);

  try {
    const payload = TokenUtil.verifyAccessToken(token);
    const user = (await User.findById(
      payload.userId
    )) as HydratedDocument<IUserDocument> | null;

    if (!user || !user.isActive) {
      set.status = 401;
      throw new Error("Unauthorized");
    }

    return { user };
  } catch (error) {
    set.status = 401;
    throw new Error("Unauthorized");
  }
});
