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

// Health check endpoint
app.use(async (ctx, next) => {
  if (ctx.path === "/health") {
    ctx.body = { status: "ok" };
    return; // Stops here for /health
  }
  await next(); // Continues to next middleware for other routes
});

// Database test endpoint
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
    return; // Stops here for /db-test
  }
  await next(); // Continues to next middleware for other routes
});

// Main route - only runs if no other route handled the request
app.use((ctx) => {
  // Check if a response has already been set by any previous middleware
  if (!ctx.body) {
    if (ctx.path === "/") {
      ctx.body = "Hello world";
    } else {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: "Route not found",
      };
    }
  }
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
  console.log(`Routes available: /, /health, /db-test`);
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
