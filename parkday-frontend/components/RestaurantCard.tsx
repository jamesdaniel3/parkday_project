import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { RestaurantCardProps } from "../types/types";
import styles from "../styles/RestaurantCardStyles";

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  description,
  logoUrl,
  storefrontUrl,
}) => {
  return (
    <View style={styles.card}>
      {/* Logo */}

      <View style={styles.content}>
        {/* Name */}
        <Text style={styles.name}>{name}</Text>

        {/* Description (optional) */}
        {description && <Text style={styles.description}>{description}</Text>}

        {/* Storefront link (optional, clickable)
        {storefrontUrl && (
          <TouchableOpacity
            onPress={() => console.log("Navigating to storefront")}
          >
            <Text style={styles.storefrontLink}>Visit Storefront</Text>
          </TouchableOpacity>
        )} */}
      </View>
      <View style={styles.logo_box}>
        {logoUrl && <Image source={{ uri: logoUrl }} style={styles.logo} />}
      </View>
    </View>
  );
};

export default RestaurantCard;
