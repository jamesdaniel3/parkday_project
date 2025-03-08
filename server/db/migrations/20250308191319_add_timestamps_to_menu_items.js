/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("menu_items", function (table) {
    // Add created_at with current timestamp as default
    table.timestamp("created_at").defaultTo(knex.fn.now());

    // Add updated_at with current timestamp as default and auto-update on change
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("your_table_name", function (table) {
    // Remove the columns if we need to roll back
    table.dropColumn("created_at");
    table.dropColumn("updated_at");
  });
};
