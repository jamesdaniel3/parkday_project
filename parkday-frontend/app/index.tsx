import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MenuScreen from "../screens/MenuScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
    </Stack.Navigator>
  );
};

export default App;

// export default App;

// import React from "react";
// import { ScrollView } from "react-native";
// import RestaurantCard from "../components/RestaurantCard";

// const App = () => {
//   return (
//     <ScrollView>
//       <RestaurantCard
//         id={1}
//         name="Delicious Pizza"
//         description="The best pizza in town!"
//         logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Superman_shield.svg/1200px-Superman_shield.svg.png"
//         storefrontUrl="https://deliciouspizza.com"
//       />
//       <RestaurantCard
//         id={2}
//         name="Sushi World"
//         description="Fresh sushi and sashimi."
//         logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Superman_shield.svg/1200px-Superman_shield.svg.png"
//       />
//     </ScrollView>
//   );
// };

// export default App;
