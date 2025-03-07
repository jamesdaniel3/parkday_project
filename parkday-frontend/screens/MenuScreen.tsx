import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";

const MenuScreen = ({ route, navigation }: any) => {
  const { restaurantId } = route.params;
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // currently just using production endpoints, can use local endpoints or use an env variable to choose
        const response = await fetch(
          `https://parkday-project-104161192327.us-east4.run.app/api/data/get-menu-items/${restaurantId}`
        );
        const data = await response.json();
        if (data.status === "success") {
          setMenuItems(data.data);
        } else {
          setError("No restaurants found.");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching data.");
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <View>
      <Text>This is the menu screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default MenuScreen;
