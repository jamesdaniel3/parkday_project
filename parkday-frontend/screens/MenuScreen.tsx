import MenuCard from "@/components/MenuItemCard";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

const MenuScreen = ({ route, navigation }: any) => {
  const { restaurantId } = route.params;
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [restaurantData, setRestaurantData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // currently just using production endpoints, can use local endpoints or use an env variable to choose
        const response = await fetch(
          `https://parkday-project-104161192327.us-east4.run.app/api/data/get-menu-items/${restaurantId}`
        );
        const data = await response.json();
        if (data.status === "success") {
          setMenuItems(data.data);
        } else {
          setError("No menu items found.");
        }
      } catch (err) {
        setError("Error fetching menu items.");
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const response = await fetch(
          `https://parkday-project-104161192327.us-east4.run.app/api/data/get-restaurant-info/${restaurantId}`
        );
        const data = await response.json();

        if (data.status === "success") {
          setRestaurantData(data.data);
        } else {
          setError("Restaurant info could not be retrieved.");
        }
      } catch (err) {
        setError("Error fetching restaurant info.");
      }
    };
    fetchRestaurantInfo();
  }, []);

  if (loading && restaurantData && menuItems) {
    setLoading(false);
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading restaurants...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <ScrollView>
        {menuItems.map((menuItem) => (
          <TouchableOpacity key={menuItem.id}>
            <MenuCard
              id={menuItem.id}
              name={menuItem.name}
              isVegetarian={menuItem.is_vegetarian}
              isKeto={menuItem.is_keto}
              isVegan={menuItem.is_vegan}
              isDairyFree={menuItem.is_dairy_free}
              isPaleo={menuItem.is_paleo}
              description={menuItem.description}
              imageUrl={menuItem.image_url}
              priceUsd={menuItem.price_usd}
              ingredients={menuItem.ingredients}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default MenuScreen;
