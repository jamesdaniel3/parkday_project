const { table } = require("../knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("restaurant_menus", function (table) {
    // primary key
    table.increments("id").primary();

    // required columns
    table.integer("restaurant_id").unsigned().notNullable();

    // timestamps
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("restaurant_menus");
};
