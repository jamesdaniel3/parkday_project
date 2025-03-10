import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcc99",
  },
  header: {
    backgroundColor: "#ffcc99",
    padding: 15,
    zIndex: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    backgroundColor: "#ffcc99",
    paddingBottom: 20,
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffcc99",
    height: "100%",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 700,
    marginTop: 20,
  },
});

export default styles;
