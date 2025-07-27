import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import database from "./config/database";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import { routes } from "./routes";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(
    cors({
      origin: true, // Tüm originlere izin ver (development için)
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
      allowedHeaders: ["*"], // Tüm header'lara izin ver
      exposeHeaders: ["*"], // Tüm header'ları expose et
      maxAge: 86400,
      preflight: true,
    })
  )
  // Preflight OPTIONS istekleri için handler
  .options("/*", () => new Response(null, { status: 204 }))
  // Response time tracking
  .onBeforeHandle(({ set }) => {
    set.headers["X-Response-Time"] = Date.now().toString();
  })
  .onAfterHandle(({ set, request }) => {
    const startTime = parseInt(
      (set.headers["X-Response-Time"] as string) || "0"
    );
    const duration = Date.now() - startTime;
    console.log(`${request.method} ${request.url} - ${duration}ms`);
  })
  .use(errorHandlerMiddleware)
  .use(
    swagger({
      path: "/swagger",
      documentation: {
        info: {
          title: "ThinkNote API",
          version: "1.0.0",
          description: "ThinkNote application REST API documentation",
        },
        tags: [
          { name: "auth", description: "Authentication endpoints" },
          { name: "countries", description: "Countries endpoints" },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
    })
  )
  .get("/", () => ({
    message: "Welcome to ThinkNote API",
    version: "1.0.0",
    documentation: "/swagger",
  }))
  .get("/health", () => ({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }))
  .group("/api", (app) => app.use(routes))
  .listen({
    port: 8080,
    hostname: "0.0.0.0",
    idleTimeout: 60,
    development: process.env.NODE_ENV !== "production",
  });

database
  .connect()
  .then(() => {
    console.log(
      `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
    );
    console.log(
      `📚 Swagger documentation available at http://localhost:8080/swagger`
    );
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server");
  app.stop();
  await database.disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing HTTP server");
  app.stop();
  await database.disconnect();
  process.exit(0);
});
