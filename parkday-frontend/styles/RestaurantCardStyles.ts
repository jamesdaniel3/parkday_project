import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: "#FAF7E4",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 7.5,
    marginBottom: 7.5,
    elevation: 5,
    height: "60%",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: "10%",
    objectFit: "cover",
  },
  logo_box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginLeft: "5%",
    marginTop: "2%",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#777",
  },
});

export default styles;
