import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  content: {
    flex: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
  },
  dietInfoContainer: {
    flexDirection: "row",
    marginTop: 10,
    flexWrap: "wrap",
  },
  dietTag: {
    backgroundColor: "#f0f0f0",
    marginRight: 5,
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
    color: "#333",
  },
  orderButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FF8C00",
    borderRadius: 5,
    alignItems: "center",
  },
  orderText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  dietContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginRight: 10,
    height: 30,
    width: 30,
  },
  dietContainerText: {},
});

export default styles;
