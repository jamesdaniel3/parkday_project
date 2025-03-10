import React from "react";
import { View, Text, Image } from "react-native";
import { MenuItemCardProps } from "@/types/types";
import styles from "../styles/MenuItemCardStyles";
import DietTag from "./DietTag";

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  isVegetarian,
  isKeto,
  isVegan,
  isDairyFree,
  isPaleo,
  description,
  imageUrl,
  priceUsd,
  ingredients,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>

        {description && <Text style={styles.description}>{description}</Text>}

        <View style={styles.dietInfoContainer}>
          {isDairyFree && <DietTag text="DF"></DietTag>}
          {isVegetarian && <DietTag text="VG"></DietTag>}
          {isVegan && <DietTag text="V"></DietTag>}
          {isKeto && <DietTag text="KE"></DietTag>}
          {isPaleo && <DietTag text="PA"></DietTag>}
        </View>
      </View>
      <View style={styles.imageContainer}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
        {!imageUrl && (
          <Image
            source={require("../assets/images/menuItemImagePlaceholder.png")}
            style={styles.placeholderImage}
          />
        )}
      </View>
    </View>
  );
};

export default MenuItemCard;
