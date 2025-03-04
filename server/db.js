const { Pool } = require("pg");

// Determine if we're running locally or on Cloud Run
const isCloudRun = process.env.K_SERVICE !== undefined;

let pool;

if (isCloudRun) {
  // When running on Cloud Run, use the Cloud SQL connection
  const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";

  // Configuration for Cloud SQL connectivity
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`,
    // Specify a Unix socket instead of host/port for Cloud SQL
    // This is the recommended method for connecting from Cloud Run
  });
} else {
  // Local development configuration
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
  });
}

// Test the connection
pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on PostgreSQL client", err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
