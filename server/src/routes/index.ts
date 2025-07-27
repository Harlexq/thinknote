import { Elysia } from "elysia";
import { authController } from "../controllers/authController";
import { countryController } from "../controllers/countryController";

export const routes = new Elysia().use(authController).use(countryController);
