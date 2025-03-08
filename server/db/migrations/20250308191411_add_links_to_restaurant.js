/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("menu_items", function (table) {
    table.text("instagram_url");
    table.text("google_maps_url");
    table.text("resy_url");
    table.text("opentable_url");
    table.text("infatuation_url");
    table.text("eater_url");
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("your_table_name", function (table) {
    // Remove the columns if we need to roll back
    table.dropColumn("instagram_url");
    table.dropColumn("google_maps_url");
    table.dropColumn("resy_url");
    table.dropColumn("opentable_url");
    table.dropColumn("infatuation_url");
    table.dropColumn("eater_url");
  });
};
