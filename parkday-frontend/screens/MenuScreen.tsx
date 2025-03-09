import MenuCard from "@/components/MenuItemCard";
import RestaurantInfoPanel from "@/components/RestaurantInfoPanel";
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
  const [restaurantData, setRestaurantData] = useState<any>({});
  const [loadingRestaurantData, setLoadingRestaurantData] = useState(true);
  const [loadingMenuData, setLoadingMenuData] = useState(true);
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
          setLoadingMenuData(false);
        } else {
          setError("No menu items found.");
          setLoadingMenuData(false);
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
          setLoadingRestaurantData(false);
        } else {
          setError("Restaurant info could not be retrieved.");
          setLoadingRestaurantData(false);
        }
      } catch (err) {
        setError("Error fetching restaurant info.");
      }
    };
    fetchRestaurantInfo();
  }, []);

  if (loadingRestaurantData || loadingMenuData) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading restaurants...</Text>
      </View>
    );
  }
  console.log(restaurantData);

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
        <RestaurantInfoPanel
          name={restaurantData.name}
          description={restaurantData.description}
          logoUrl={restaurantData.logo_url}
          storeImageUrl={restaurantData.store_image_url}
          instagramUrl={restaurantData.instagram_url}
          googleMapsUrl={restaurantData.google_maps_url}
          opentableUrl={restaurantData.opentable_url}
          resyUrl={restaurantData.resy_url}
          eaterUrl={restaurantData.eater_url}
          infatuationUrl={restaurantData.infatuation_url}
        ></RestaurantInfoPanel>
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
