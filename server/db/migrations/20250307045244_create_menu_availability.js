/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("menu_availability", function (table) {
    // primary key
    table.increments("id").primary();

    // required columns
    table.integer("menu_id").unsigned().notNullable();
    table.string("day_of_week").notNullable();
    table.string("opening_time").notNullable();
    table.string("closing_time").notNullable();

    // time stamps
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("menu_availability");
};
