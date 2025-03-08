/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("restaurants", function (table) {
    table.renameColumn("stored_image_url", "store_image_url");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("restaurants", function (table) {
    // Reverse the change in the down migration
    table.renameColumn("store_image_url", "stored_image_url");
  });
};
