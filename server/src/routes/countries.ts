import Elysia from "elysia";
import { Country } from "../models/Country";
import config from "../../config";
import COUNTRY_MESSAGES, { Language } from "../constants/countries";

const countriesRouter = new Elysia({ prefix: "/countries" }).get(
  "/",
  async ({ headers }) => {
    const acceptLanguage = headers["accept-language"];
    const languageCode = acceptLanguage?.split(",")[0]?.split("-")[0] || config.language.default;
    const language = (languageCode in COUNTRY_MESSAGES ? languageCode : config.language.default) as Language;
    
    try {
      const countries = await Country.find({});
      return {
        status: true,
        message: COUNTRY_MESSAGES[language].SUCCESSFULL_RESPONSE,
        data: {
          countries,
        },
      };
    } catch (e) {
      return {
        status: false,
        message: COUNTRY_MESSAGES[language].SERVER_ERROR,
      };
    }
  },
  {
    detail: {
      tags: ["Auth"],
    },
  }
);

export default countriesRouter;