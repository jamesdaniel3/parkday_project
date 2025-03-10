import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { RestaurantInfoPanelProps } from "../types/types";
import styles from "../styles/RestaurantInfoPanelStyles";

const RestaurantInfoPanel: React.FC<RestaurantInfoPanelProps> = ({
  name,
  description,
  logoUrl,
  storeImageUrl,
  instagramUrl,
  googleMapsUrl,
  opentableUrl,
  resyUrl,
  eaterUrl,
  infatuationUrl,
}) => {
  const openLink = (address: string) => {
    if (instagramUrl) {
      Linking.openURL(address).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    }
  };
  return (
    <View style={styles.continer}>
      <Text style={styles.restaurantName}>{name}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={styles.imageContainer}>
        {instagramUrl && (
          <TouchableOpacity onPress={() => openLink(instagramUrl)}>
            <Image
              source={require("../assets/images/instagram.png")}
              style={{ height: 25, width: 25, marginRight: 30 }}
            />
          </TouchableOpacity>
        )}
        {googleMapsUrl && (
          <TouchableOpacity onPress={() => openLink(googleMapsUrl)}>
            <Image
              source={require("../assets/images/googleMaps.png")}
              style={{ height: 25, width: 25, marginRight: 30 }}
            />
          </TouchableOpacity>
        )}
        {opentableUrl && (
          <TouchableOpacity onPress={() => openLink(opentableUrl)}>
            <Image
              source={require("../assets/images/opentable.png")}
              style={{
                height: 25,
                width: 35,
                tintColor: "black",
                marginRight: 30,
              }}
            />
          </TouchableOpacity>
        )}
        {resyUrl && (
          <TouchableOpacity onPress={() => openLink(resyUrl)}>
            <Image
              source={require("../assets/images/resy.png")}
              style={{
                height: 25,
                width: 50,
                tintColor: "black",
                marginRight: 30,
              }}
            />
          </TouchableOpacity>
        )}
        {infatuationUrl && (
          <TouchableOpacity onPress={() => openLink(infatuationUrl)}>
            <Image
              source={require("../assets/images/infatuation.png")}
              style={{
                height: 25,
                width: 35,
                tintColor: "black",
                marginRight: 30,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default RestaurantInfoPanel;
