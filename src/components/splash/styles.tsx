import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  skipText: {
    color: "#888",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  videoContainer: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 30,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
  },
  modernButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  skipButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
