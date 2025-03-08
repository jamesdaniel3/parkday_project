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
      {/* Image */}
      <View style={styles.imageContainer}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      </View>

      {/* Menu item content */}
      <View style={styles.content}>
        {/* Name */}
        <Text style={styles.name}>{name}</Text>

        {/* Description */}
        {description && <Text style={styles.description}>{description}</Text>}

        {/* Dietary Information */}
        <View style={styles.dietInfoContainer}>
          {isDairyFree && <DietTag text="DF"></DietTag>}
          {isVegetarian && <DietTag text="VG"></DietTag>}
          {isVegan && <DietTag text="V"></DietTag>}
          {isKeto && <DietTag text="KE"></DietTag>}
          {isPaleo && <DietTag text="PA"></DietTag>}
        </View>
      </View>
    </View>
  );
};

export default MenuItemCard;
