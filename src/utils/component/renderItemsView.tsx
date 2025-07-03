import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../components/hooks/APIsFunctions/useFetch";
import { GetProjectUrl, SetReoute } from "../../../request";
import NodeMenuItemsSchema from "../../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import MenuView from "../../components/menu-components/MenuView";
import HomePage from "../../kitchensink-components/HomestayPage";
import MarketPlace from "../../kitchensink-components/MarketPlace";
import MobileProfilePage from "../../kitchensink-components/profile/MobileProfilePage";
import { updateCurrentLocation } from "../../reducers/LocationReducer";
import { SetResponsiveContainer } from "../component/SetResponsiveContainer";
import { GetCard } from "../operation/GetCard";
import { requestLocationPermission } from "./requestLocationPermission";

const RenderItemsView = ({ dashboardItemId, routePath }: any) => {
  SetReoute(NodeMenuItemsSchema.projectProxyRoute);
  const {
    data: GetCustomerCart,
    error,
    isLoading,
  } = useFetch("/ShopNode/GetCustomerCart", GetProjectUrl());
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );
  const total = useSelector((state) => state.cart.totalAmount);

  useEffect(() => {
    if (GetCustomerCart) {
      GetCard(NodeMenuItemsSchema, GetCustomerCart, dispatch, cart, total);
    }
    GetCard(NodeMenuItemsSchema, null, dispatch, cart, total);
  }, [GetCustomerCart, isLoading]);
  useEffect(() => {
    const getAndSetLocation = async () => {
      const coords = await requestLocationPermission();
      if (coords) {
        dispatch(updateCurrentLocation(coords));
      }
    };

    getAndSetLocation();
  }, []);
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
