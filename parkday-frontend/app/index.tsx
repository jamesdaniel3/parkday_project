import React from "react";
import { ScrollView } from "react-native";
import RestaurantCard from "../components/RestaurantCard";

const App = () => {
  return (
    <ScrollView>
      <RestaurantCard
        id={1}
        name="Delicious Pizza"
        description="The best pizza in town!"
        logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Superman_shield.svg/1200px-Superman_shield.svg.png"
        storefrontUrl="https://deliciouspizza.com"
      />
      <RestaurantCard
        id={2}
        name="Sushi World"
        description="Fresh sushi and sashimi."
        logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Superman_shield.svg/1200px-Superman_shield.svg.png"
      />
    </ScrollView>
  );
};

export default App;
