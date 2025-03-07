import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MenuCardProps } from "@/types/types";
import styles from "../styles/MenuCardStyles";

const MenuCard: React.FC<MenuCardProps> = ({
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
          {isVegetarian && <Text style={styles.dietTag}>Vegetarian</Text>}
          {isKeto && <Text style={styles.dietTag}>Keto</Text>}
          {isVegan && <Text style={styles.dietTag}>Vegan</Text>}
          {isDairyFree && <Text style={styles.dietTag}>Dairy-Free</Text>}
          {isPaleo && <Text style={styles.dietTag}>Paleo</Text>}
        </View>
      </View>
    </View>
  );
};

export default MenuCard;
