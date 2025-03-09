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
  StyleSheet,
  SafeAreaView,
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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading restaurants...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>Return to restaurants</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
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
          />
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcc99",
  },
  header: {
    backgroundColor: "#ffcc99",
    padding: 15,
    zIndex: 10, // Ensure header is above other content
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    backgroundColor: "#ffcc99",
    paddingBottom: 20,
  },
});

export default MenuScreen;
