import React from "react";
import { View, Text, Button } from "react-native";

const MenuScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>This is the menu screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default MenuScreen;
