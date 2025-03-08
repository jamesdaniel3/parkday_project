/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.dropTableIfExists("restaurant_urls");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.createTable("restaurant_urls", function (table) {
    // Primary key
    table.increments("id").primary();

    // Required fields
    table.integer("restaurant_id").unsigned().notNullable();
    table.string("url_type").notNullable();
    table.text("url").notNullable();

    // Timestamps
    table.timestamps(true, true); // Creates created_at and updated_at columns
  });
};
