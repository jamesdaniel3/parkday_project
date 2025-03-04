// Load environment variables from .env file in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Koa = require("koa");
const Router = require("koa-router");

// Create a new app and router
const app = new Koa();
const router = new Router();

// Import db only if needed for specific routes
let db;
try {
  db = require("./db");
  console.log("Database module loaded successfully");
} catch (error) {
  console.error("Error loading database module:", error.message);
  // Create dummy db to prevent crashes
  db = {
    query: async () => {
      throw new Error("Database not available");
    },
    pool: { end: (cb) => cb && cb() },
  };
}

// Log all requests
app.use(async (ctx, next) => {
  console.log(`Request received: ${ctx.method} ${ctx.url}`);
  await next();
  console.log(`Response sent: ${ctx.status}`);
});

// Error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Server error:", err);
    ctx.status = err.status || 500;
    ctx.body = {
      status: "error",
      message: err.message || "An error occurred",
    };
  }
});

// Define routes
router.get("/health", (ctx) => {
  ctx.body = { status: "ok" };
});

router.get("/db-test", async (ctx) => {
  try {
    console.log("Attempting database query");
    const result = await db.query("SELECT NOW() as current_time");
    console.log("Database query result:", result.rows[0]);
    ctx.body = {
      status: "Database connection successful",
      timestamp: result.rows[0].current_time,
    };
  } catch (error) {
    console.error("Database error:", error);
    ctx.status = 500;
    ctx.body = {
      status: "error",
      message: "Database connection failed: " + error.message,
    };
  }
});

router.get("/", (ctx) => {
  ctx.body = "Hello world";
});

// Add routes to the application
app.use(router.routes());
app.use(router.allowedMethods());

// 404 handler for routes not defined
app.use((ctx) => {
  ctx.status = 404;
  ctx.body = {
    status: "error",
    message: "Route not found",
  };
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
  console.log(`Routes available: /, /health, /db-test`);
});

// Handle termination signals
const shutdown = () => {
  console.log("Shutting down gracefully...");

  // Close the database pool if it exists
  if (db && db.pool) {
    db.pool.end(() => {
      console.log("Database connections closed");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });
  } else {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  }

  // Force close after 10s
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
