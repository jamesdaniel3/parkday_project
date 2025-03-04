// Load environment variables from .env file in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Koa = require("koa");
const db = require("./db");

const app = new Koa();

// Add error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Server error:", err);
    ctx.status = err.status || 500;
    ctx.body = {
      message: "An error occurred",
    };
  }
});

// Add a health check endpoint
app.use(async (ctx, next) => {
  if (ctx.path === "/health") {
    ctx.body = { status: "ok" };
    return;
  }
  await next();
});

// Add a database test endpoint
app.use(async (ctx, next) => {
  if (ctx.path === "/db-test") {
    try {
      const result = await db.query("SELECT NOW() as current_time");
      ctx.body = {
        status: "Database connection successful",
        timestamp: result.rows[0].current_time,
      };
    } catch (error) {
      console.error("Database connection error:", error);
      ctx.status = 500;
      ctx.body = {
        status: "Database connection failed",
        error: error.message,
      };
    }
    return;
  }
  await next();
});

// Main route
app.use((ctx) => {
  ctx.body = "Hello world";
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});

// Handle termination signals
const shutdown = () => {
  console.log("Shutting down gracefully...");

  // Close the database pool
  db.pool.end(() => {
    console.log("Database connections closed");

    // Then close the server
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });

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
