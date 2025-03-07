// knexfile.js
require("dotenv").config();

const commonConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

module.exports = {
  development: {
    ...commonConfig,
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
  },

  production: {
    ...commonConfig,
    connection: process.env.K_SERVICE
      ? {
          host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
        }
      : {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT || 5432,
          database: process.env.DB_NAME,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
        },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
