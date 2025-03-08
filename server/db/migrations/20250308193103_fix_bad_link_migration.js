/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Create a new migration file to fix the issue
exports.up = function (knex) {
  // Remove the columns that were incorrectly added to menu_items
  return knex.schema.table("menu_items", function (table) {
    table.dropColumn("instagram_url");
    table.dropColumn("google_maps_url");
    table.dropColumn("resy_url");
    table.dropColumn("opentable_url");
    table.dropColumn("infatuation_url");
    table.dropColumn("eater_url");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // Re-add the columns to menu_items if needed to roll back this fix
  return knex.schema.table("menu_items", function (table) {
    table.text("instagram_url");
    table.text("google_maps_url");
    table.text("resy_url");
    table.text("opentable_url");
    table.text("infatuation_url");
    table.text("eater_url");
  });
};
