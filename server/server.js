// Load environment variables from .env file in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Koa = require("koa");
let db;

// Try to require db.js but catch any errors
try {
  console.log("Attempting to load the database module...");
  db = require("./db");
  console.log("Database module loaded successfully");
} catch (error) {
  console.error("CRITICAL ERROR loading database module:", error);
  // Create a dummy db module to prevent crashes
  db = {
    query: async () => {
      throw new Error("Database module failed to load");
    },
    pool: {
      end: (callback) => callback(),
    },
  };
}

const app = new Koa();

// Request logging middleware
app.use(async (ctx, next) => {
  console.log(`${new Date().toISOString()} - ${ctx.method} ${ctx.url}`);
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(
    `${new Date().toISOString()} - ${ctx.method} ${ctx.url} - ${
      ctx.status
    } - ${ms}ms`
  );
});

// Add error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Server error:", err);
    ctx.status = err.status || 500;
    ctx.body = {
      message: "An error occurred",
      error: err.message,
    };
  }
});

// Health check endpoint
app.use(async (ctx, next) => {
  if (ctx.path === "/health") {
    console.log("Handling /health endpoint");
    ctx.body = { status: "ok" };
    return; // Stops here for /health
  }
  await next(); // Continues to next middleware for other routes
});

// Database test endpoint
app.use(async (ctx, next) => {
  if (ctx.path === "/db-test") {
    console.log("Handling /db-test endpoint");
    try {
      console.log("Attempting database query...");
      const result = await db.query("SELECT NOW() as current_time");
      console.log("Database query successful:", result.rows[0]);
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
    console.log("DB-test response body set to:", ctx.body);
    return; // Stops here for /db-test
  }
  await next(); // Continues to next middleware for other routes
});

// Main route - only runs if no other route handled the request
app.use((ctx) => {
  console.log("Reached catch-all route handler");
  // Check if a response has already been set by any previous middleware
  if (!ctx.body) {
    console.log("No response body set by previous middleware");
    if (ctx.path === "/") {
      ctx.body = "Hello world";
    } else {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: "Route not found",
      };
    }
  } else {
    console.log("Response already set to:", ctx.body);
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
  if (db && db.pool) {
    db.pool.end(() => {
      console.log("Database connections closed");

      // Then close the server
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
