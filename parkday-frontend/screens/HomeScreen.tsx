import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import RestaurantCard from "@/components/RestaurantCard";

const HomeScreen = ({ navigation }: any) => {
  const handleCardPress = (id: number) => {
    // Navigate to the MenuScreen with the restaurant ID
    navigation.navigate("Menu", { restaurantId: id });
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => handleCardPress(1)}>
        <RestaurantCard
          id={1}
          name="Delicious Pizza"
          description="The best pizza in town!"
          logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Superman_shield.svg/1200px-Superman_shield.svg.png"
          storefrontUrl="https://deliciouspizza.com"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCardPress(2)}>
        <RestaurantCard
          id={2}
          name="Sushi World"
          description="Fresh sushi and sashimi."
          logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Superman_shield.svg/1200px-Superman_shield.svg.png"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;
