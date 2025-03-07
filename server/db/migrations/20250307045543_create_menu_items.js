/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("menu_items", function (table) {
    // primary key
    table.increments("id").primary();

    // required columns
    table.integer("menu_id").unsigned().notNullable();
    table.string("name").notNullable();
    table.boolean("is_vegetarian").notNullable();
    table.boolean("is_keto").notNullable();
    table.boolean("is_vegan").notNullable();
    table.boolean("is_dairy_free").notNullable();
    table.boolean("is_paleo").notNullable();

    // optional columns
    table.string("description");
    table.string("image_url");
    table.float("price_usd");
    table.string("ingredients");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("menu_items");
};
