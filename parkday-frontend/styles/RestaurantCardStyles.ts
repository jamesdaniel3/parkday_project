import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "2%",
    borderRadius: 20,
    borderColor: "black",
    backgroundColor: "#FAF7E4",
    marginHorizontal: 15,
    marginVertical: 7.5,
    height: 120, // Fixed height for the card
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: "10%",
    resizeMode: "cover", // Correct image scaling property
  },
  logo_box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1, // Allow content to take up remaining space
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "2%",
  },
  name: {
    fontFamily: "PanelSans-Bold",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#777",
  },
  truncatedText: {
    overflow: "hidden", // Ensure text doesn't overflow
  },
  moreLink: {
    color: "blue",
    textDecorationLine: "underline", // Correct property for underlining text
    fontSize: 14,
    marginTop: 5,
  },
});

export default styles;
