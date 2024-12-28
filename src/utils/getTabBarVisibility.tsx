import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;

  console.log("Active Route Name:", routeName);

  if (["CheckoutScreen", "Payment", "Cart"].includes(routeName)) {
    return "none";
  }
  return "flex";
};
