import { Elysia } from "elysia";
import logger from "./services/getLogger";
import * as databaseService from "./services/database";
import authRouter from "./routes/auth";
import countriesRouter from "./routes/countries";
import swagger from "@elysiajs/swagger";
import pkg from "../package.json";
import config from "../config";

await databaseService.default.connectDB();

const app = new Elysia({ prefix: "/api" })
  .options("/*", ({ set }) => {
    set.headers["Access-Control-Allow-Origin"] = config.frontend.url
    set.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, PATCH, OPTIONS";
    set.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    set.headers["Access-Control-Allow-Credentials"] = "true";
    set.headers["Access-Control-Max-Age"] = "86400";
    return new Response(null, { status: 204 });
  })
  .derive(({ set }) => {
    set.headers["Access-Control-Allow-Origin"] = config.frontend.url
    set.headers["Access-Control-Allow-Credentials"] = "true";
  })
  .onError(({ set, error }) => {
    set.headers["Access-Control-Allow-Origin"] = config.frontend.url
    set.headers["Access-Control-Allow-Credentials"] = "true";
    return { status: false };
  })
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