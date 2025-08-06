import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../components/hooks/APIsFunctions/useFetch";
import { GetProjectUrl } from "../../../request";
import NodeMenuItemsSchema from "../../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import MenuView from "../../components/menu-components/MenuView";
import HomePage from "../../kitchensink-components/HomestayPage";
import MobileProfilePage from "../../kitchensink-components/profile/MobileProfilePage";
import { updateCurrentLocation } from "../../reducers/LocationReducer";
import { SetResponsiveContainer } from "../component/SetResponsiveContainer";
import { GetCard } from "../operation/GetCard";
import { requestLocationPermission } from "./requestLocationPermission";
import CartSchemaActions from "../../Schemas/MenuSchema/CartSchemaActions.json";
import CartSchema from "../../Schemas/MenuSchema/CartSchema.json";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import useFetchWithoutBaseUrl from "../../../components/hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import OrdersScreen from "../../kitchensink-components/orders/OrdersScreen";
const RenderItemsView = ({ dashboardItemId, routePath }: any) => {
  const getAction =
    CartSchemaActions &&
    CartSchemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );

  const dataSourceAPI = (query) => {
    return buildApiUrl(query, { projectRout: CartSchema.projectProxyRoute });
  };
  const {
    data: GetCustomerCart,
    error,
    isLoading,
  } = useFetchWithoutBaseUrl(dataSourceAPI(getAction));
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
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
    case "Orders":
      return SetResponsiveContainer(<OrdersScreen />, true);
    default:
      return <HomePage />;
  }
};

export default RenderItemsView;
