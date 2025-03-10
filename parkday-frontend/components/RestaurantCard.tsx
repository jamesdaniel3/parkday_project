import React from "react";
import { View, Text, Image } from "react-native";
import { RestaurantCardProps } from "../types/types";
import styles from "../styles/RestaurantCardStyles";

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  description,
  logoUrl,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        {description && (
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={styles.description}
          >
            {description}
          </Text>
        )}
      </View>
      <View style={styles.logoBox}>
        {logoUrl && <Image source={{ uri: logoUrl }} style={styles.logo} />}
      </View>
    </View>
  );
};

export default RestaurantCard;
