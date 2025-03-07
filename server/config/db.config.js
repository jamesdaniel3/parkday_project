// config/db.config.js
const { Pool } = require("pg");

const isCloudRun = process.env.K_SERVICE !== undefined;

const createDbPool = () => {
  try {
    if (isCloudRun) {
      const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql";
      const instanceConnectionName = process.env.INSTANCE_CONNECTION_NAME;

      if (!instanceConnectionName) {
        throw new Error(
          "Missing INSTANCE_CONNECTION_NAME environment variable"
        );
      }

      return new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: `${dbSocketPath}/${instanceConnectionName}`,
      });
    } else {
      return new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
      });
    }
  } catch (error) {
    console.error("CRITICAL ERROR initializing database pool:", error);
    return null;
  }
};

module.exports = { createDbPool };
