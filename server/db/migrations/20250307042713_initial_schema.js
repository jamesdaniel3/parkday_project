/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("restaurants", function (table) {
    // Primary key
    table.increments("id").primary();

    // Required fields
    table.string("name").notNullable();
    table.text("description").notNullable();

    // Optional fields
    table.string("logo_url").nullable();
    table.string("stored_image_url").nullable();

    // Timestamps
    table.timestamps(true, true); // Creates created_at and updated_at columns
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("restaurants");
};
