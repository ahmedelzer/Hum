export const theme = {
  body: "#F9FAFB", // app background
  text: "#1F2937", // default text color
  primary: "rgb(148, 163, 184)", // secondary action buttons
  dark_card: "rgb(10 50 60 )", // card and panel background
  card: "#e5e7eb",
  surface: "#FFFFFF", // for inputs, modals, inner surfaces
  accent: "#FF6700", // primary brand color
  accentHover: "#0098FF", // hover state for accent buttons
  border: "#E5E7EB", // borders, separators
  notification: "#FFF4E5", // notification background (light orange)
  success: "#22C55E", // success messages, checkout complete
  error: "#EF4444", // error messages, invalid form
};
const changeTheme = (newTheme) => {
  theme = newTheme;
};
