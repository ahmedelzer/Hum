import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../components/hooks/APIsFunctions/useFetch";
import { GetProjectUrl, SetReoute } from "../../request";
import NodeMenuItemsSchema from "../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import MenuView from "../components/menu-components/MenuView";
import HomePage from "../kitchensink-components/HomestayPage";
import MarketPlace from "../kitchensink-components/MarketPlace";
import MobileProfilePage from "../kitchensink-components/MobileProfilePage";
import { GetCard } from "./GetCard";
import { SetResponsiveContainer } from "./SetResponsiveContainer";
import LoadingScreen from "../kitchensink-components/loading/LoadingScreen";
import { Chase } from "react-native-animated-spinkit";

const RenderItemsView = ({ dashboardItemId, routePath }: any) => {
  SetReoute(NodeMenuItemsSchema.projectProxyRoute);
  const {
    data: GetCustomerCart,
    error,
    isLoading,
  } = useFetch("/ShopNode/GetCustomerCart", GetProjectUrl());
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.totalAmount);

  useEffect(() => {
    if (GetCustomerCart) {
      GetCard(NodeMenuItemsSchema, GetCustomerCart, dispatch, cart, total);
    }
    GetCard(NodeMenuItemsSchema, null, dispatch, cart, total);
  }, [GetCustomerCart, isLoading]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!Array.isArray(cart)) return;

  //     const updatedCart = cart.filter((item) => {
  //       // Guard in case item or item.addedAt is missing
  //       if (!item || !item.addedTime) return true;
  //       return !isPast10Minutes(item.addedTime);
  //     });

  //     if (
  //       updatedCart &&
  //       Array.isArray(updatedCart) &&
  //       updatedCart.length !== cart.length
  //     ) {
  //       const totalAmount = 0;

  //       dispatch({
  //         type: "cart/setCartFromStorage",
  //         payload: {
  //           cart: updatedCart,
  //           totalAmount,
  //         },
  //       });
  //     }
  //   }, 30 * 1000); // every 30 seconds

  //   return () => clearInterval(interval); // cleanup on unmount
  // }, [cart]);
  // if (isLoading || !GetCustomerCart) {
  //   console.log(isLoading, GetCustomerCart, error);

  //   return <LoadingScreen LoadingComponent={<Chase size={40} />} />;
  // }
  switch (routePath) {
    case "MenuView":
      return SetResponsiveContainer(<MenuView schemas={[]} />, true);
    case "Home":
      return SetResponsiveContainer(<HomePage />, true);
    case "Profile":
      return SetResponsiveContainer(<MobileProfilePage />, true);
    case "marketPlace":
      return SetResponsiveContainer(<MarketPlace />, true);
    default:
      return <HomePage />;
  }
};

export default RenderItemsView;
