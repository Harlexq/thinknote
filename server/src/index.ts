import { Elysia, t } from "elysia";
import logger from "./services/getLogger";
import * as databaseService from "./services/database";

import authRouter from "./routes/auth";
import countriesRouter from "./routes/countries";

import swagger from "@elysiajs/swagger";
import pkg from "../package.json";
import cors from "@elysiajs/cors";
import config from "../config";

await databaseService.default.connectDB();

const app = new Elysia({ prefix: "/api" })
  .use(
    cors({
      origin: config.frontend.url,
    })
  )
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "ThinkNote API Documentation",
          version: pkg.version,
        },
        tags: [
          { name: "App", description: "General endpoints" },
          { name: "Auth", description: "Authentication endpoints" },
        ],
      },
    })
  )
  .get("/", () => "Yes the API is working sucessfully! 👀", {
    detail: {
      tags: ["App"],
    },
  })
  .use(authRouter)
  .use(countriesRouter)
  .onStart(() => {
    logger.info(`The server is started successfully.`);
    logger.info(`Is production: ${!!Bun.env.NODE_ENV}`);
  })
  .listen(8888);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
