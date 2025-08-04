export const theme = {
  body: "#F9FAFB", // app background
  text: "#1F2937", // default text color
  primary: "rgb(148, 163, 184)", // secondary action buttons
  dark_card: "rgb(10 50 60 )", // card and panel background
  card: "#e5e7eb",
  surface: "#FFFFFF", // for inputs, modals, inner surfaces
  accent: "#ef4444", // primary brand color
  accentHover: "#0098FF", // hover state for accent buttons
  border: "#E5E7EB", // borders, separators
  notification: "#FFF4E5", // notification background (light orange)
  success: "#22C55E", // success messages, checkout complete
  error: "#EF4444", // error messages, invalid form
};
// export const theme = {
//   body: "#0F172A", // dark background
//   text: "#F1F5F9", // light text color
//   primary: "rgb(203, 213, 225)", // muted light for secondary buttons
//   dark_card: "#1E293B", // card and panel background
//   card: "#1F2937", // slightly lighter than dark_card
//   surface: "#334155", // surface for inputs, modals
//   accent: "#ef4444", // brand color remains
//   accentHover: "#0098FF", // hover accent (can stay bright)
//   border: "#475569", // muted border color for dark surfaces
//   notification: "#4B5563", // dark notification background
//   success: "#4ADE80", // light green for success on dark bg
//   error: "#F87171", // light red for error on dark bg
// };
const changeTheme = (newTheme) => {
  theme = newTheme;
};
