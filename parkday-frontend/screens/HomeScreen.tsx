import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import RestaurantCard from "@/components/RestaurantCard";
import styles from "@/styles/MenuScreenStyles";

const HomeScreen = ({ navigation }: any) => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // currently just using production endpoints, can use local endpoints or use an env variable to choose
        const response = await fetch(
          "https://parkday-project-104161192327.us-east4.run.app/api/data/get-open-restaurants"
        );
        const data = await response.json();
        if (data.status === "success") {
          setRestaurants(data.data);
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

  const handleCardPress = (id: number) => {
    navigation.navigate("Menu", { restaurantId: id });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
        <Text style={styles.loadingText}>Loading restaurants...</Text>
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
    <ScrollView style={{ backgroundColor: "#ffcc99", paddingTop: 50 }}>
      {restaurants.map((restaurant) => (
        <TouchableOpacity
          key={restaurant.id}
          onPress={() => handleCardPress(restaurant.id)}
        >
          <RestaurantCard
            name={restaurant.name}
            description={restaurant.description}
            logoUrl={restaurant.logo_url}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
