const { createDbPool } = require("../config/db.config");

const pool = createDbPool();

// Set up pool event handlers
if (pool) {
  pool.on("connect", () => {
    console.log("Connected to PostgreSQL database");
  });

  pool.on("error", (err) => {
    console.error("Unexpected error on PostgreSQL client", err);
  });
}

module.exports = {
  query: async (text, params) => {
    if (!pool) {
      throw new Error("Database pool not initialized");
    }

    console.log("Executing query:", text);
    try {
      const result = await pool.query(text, params);
      return result;
    } catch (error) {
      console.error("Query execution failed:", error);
      throw error;
    }
  },

  getPool: () => pool,
};
