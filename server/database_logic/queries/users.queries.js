module.exports = {
  getAllRestaurants: "SELECT * FROM restaurants",
  getOpenRestaurants: `
  SELECT DISTINCT r.* 
  FROM restaurants r
  LEFT JOIN operating_hours oh 
      ON r.id = oh.restaurant_id 
      AND oh.day_of_week = $1
  WHERE oh.id IS NULL 
     OR (
         (oh.opening_time <= oh.closing_time AND $2 BETWEEN oh.opening_time AND oh.closing_time)
         OR 
         (oh.opening_time > oh.closing_time AND ($3 >= oh.opening_time OR $4 <= oh.closing_time))
     )
`,
  getMenuItems: `
  SELECT mi.*
  FROM menu_items mi
  JOIN (
    SELECT m.id AS menu_id
    FROM restaurant_menus m
    LEFT JOIN menu_availability ma
      ON m.id = ma.menu_id
      AND ma.day_of_week = $1
    WHERE m.restaurant_id = $2
      AND (
        ma.menu_id IS NULL
        OR (
          (ma.opening_time <= ma.closing_time AND $3 BETWEEN ma.opening_time AND ma.closing_time)
          OR 
          (ma.opening_time > ma.closing_time AND ($4 >= ma.opening_time OR $5 <= ma.closing_time))
        )
      )
  ) active_menus ON mi.menu_id = active_menus.menu_id
  `,
  getRestaurantInfo: `SELECT * FROM restaurants r WHERE r.id = $1`,
  addRestaurant: "Dynamic query built in service",
  addMenu: "Dynamic query built in service",
  addMenuItem: "Dynamic query built in service",
};
