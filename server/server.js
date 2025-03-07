// server.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const db = require("./database");
const routes = require("./routes");
const loggingMiddleware = require("./middlewares/logging.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = new Koa();

// Apply middlewares
app.use(loggingMiddleware);
app.use(errorMiddleware);
app.use(bodyParser());

// Apply routes
routes(app);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});

// Handle termination signals
const shutdown = () => {
  console.log("Shutting down gracefully...");

  const pool = db.getPool();
  if (pool) {
    pool.end(() => {
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

module.exports = app; // For testing
