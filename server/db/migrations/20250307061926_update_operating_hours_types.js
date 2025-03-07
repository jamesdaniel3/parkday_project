/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("operating_hours", function (table) {
      // Create temporary columns
      table.time("opening_time_new");
      table.time("closing_time_new");
      table.integer("day_of_week_new");
    })
    .then(function () {
      return knex.raw(`
      UPDATE operating_hours 
      SET 
        opening_time_new = opening_time::time,
        closing_time_new = closing_time::time,
        day_of_week_new = day_of_week::integer
    `);
    })
    .then(function () {
      return knex.schema.alterTable("operating_hours", function (table) {
        // Drop the original columns
        table.dropColumn("opening_time");
        table.dropColumn("closing_time");
        table.dropColumn("day_of_week");
      });
    })
    .then(function () {
      return knex.schema.alterTable("operating_hours", function (table) {
        // Rename the new columns to the original names
        table.renameColumn("opening_time_new", "opening_time");
        table.renameColumn("closing_time_new", "closing_time");
        table.renameColumn("day_of_week_new", "day_of_week");
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("operating_hours", function (table) {
      table.string("opening_time_old", 10);
      table.string("closing_time_old", 10);
      table.string("day_of_week_old", 10);
    })
    .then(function () {
      return knex.raw(`
      UPDATE operating_hours 
      SET 
        opening_time_old = opening_time::text,
        closing_time_old = closing_time::text,
        day_of_week_old = day_of_week::text
    `);
    })
    .then(function () {
      return knex.schema.alterTable("operating_hours", function (table) {
        table.dropColumn("opening_time");
        table.dropColumn("closing_time");
        table.dropColumn("day_of_week");
      });
    })
    .then(function () {
      return knex.schema.alterTable("operating_hours", function (table) {
        table.renameColumn("opening_time_old", "opening_time");
        table.renameColumn("closing_time_old", "closing_time");
        table.renameColumn("day_of_week_old", "day_of_week");
      });
    });
};
