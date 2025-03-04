const { Pool } = require("pg");

// Determine if we're running locally or on Cloud Run
const isCloudRun = process.env.K_SERVICE !== undefined;

console.log("DB Configuration - Running on Cloud Run:", isCloudRun);

let pool;

try {
  if (isCloudRun) {
    // When running on Cloud Run, use the Cloud SQL connection
    const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";
    const instanceConnectionName = process.env.INSTANCE_CONNECTION_NAME;

    if (!instanceConnectionName) {
      throw new Error("Missing INSTANCE_CONNECTION_NAME environment variable");
    }

    console.log("DB Config - Using socket path:", dbSocketPath);
    console.log(
      "DB Config - Instance connection name:",
      instanceConnectionName
    );

    // Configuration for Cloud SQL connectivity
    pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: `${dbSocketPath}/${instanceConnectionName}`,
    });

    console.log("DB Config - Created pool with socket connection");
  } else {
    // Local development configuration
    console.log("DB Config - Using TCP connection for local development");

    pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
    });

    console.log("DB Config - Created pool with TCP connection");
  }

  // Test the connection
  pool.on("connect", () => {
    console.log("Connected to PostgreSQL database");
  });

  pool.on("error", (err) => {
    console.error("Unexpected error on PostgreSQL client", err);
  });

  console.log("Database module initialization complete");
} catch (error) {
  console.error("CRITICAL ERROR initializing database pool:", error);

  // Create a dummy pool to prevent crashes
  pool = {
    query: async () => {
      throw new Error("Database pool failed to initialize: " + error.message);
    },
    end: (callback) => {
      if (typeof callback === "function") callback();
    },
  };
}

module.exports = {
  query: async (text, params) => {
    console.log("Executing query:", text);
    try {
      const result = await pool.query(text, params);
      console.log("Query executed successfully");
      return result;
    } catch (error) {
      console.error("Query execution failed:", error);
      throw error;
    }
  },
  pool,
};
