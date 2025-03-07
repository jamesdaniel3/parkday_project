import MenuCard from "@/components/MenuCard";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, TouchableOpacity } from "react-native";

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
    <ScrollView>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
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
  );
};

export default MenuScreen;
