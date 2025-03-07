/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("operating_hours", function (table) {
    // Primary key
    table.increments("id").primary();

    // Required Values
    table.integer("restaurant_id").unsigned().notNullable();
    table.string("day_of_week").notNullable();
    table.string("opening_time").notNullable();
    table.string("closing_time").notNullable();

    // Timestamps
    table.timestamps(true, true); // Creates created_at and updated_at columns
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("operating_hours");
};
