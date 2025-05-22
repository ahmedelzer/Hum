import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;

  if (
    ["CheckoutScreen", "Payment", "Cart", "DetailsProductScreen"].includes(
      routeName
    )
  ) {
    return "none";
  }
  return "flex";
};
