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
};
