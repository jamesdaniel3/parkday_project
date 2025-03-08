import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DietTagProps } from "../types/types";
import styles from "../styles/MenuItemCardStyles";

const MenuCard: React.FC<DietTagProps> = ({ text }) => {
  // Define the color based on the `text` input
  const containerStyle = {
    backgroundColor: getColorForText(text),
  };

  return (
    <View style={[styles.dietContainer, containerStyle]}>
      <Text style={styles.dietContainerText}>{text}</Text>
    </View>
  );
};

// Helper function to return color based on the `text` prop
const getColorForText = (text: string) => {
  switch (text) {
    case "V":
      return "#F7E2C7";
    case "KE":
      return "#E6A49F";
    case "VG":
      return "#A8C47F";
    case "DF":
      return "#F3D27A";
    case "PA":
      return "#B9E3F7";
    default:
      return "gray"; // Default color
  }
};

export default MenuCard;
