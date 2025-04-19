import { View } from "react-native";
import AddLocation from "../components/menu-components/AddLocation";
import MenuView from "../components/menu-components/MenuView";
import HomePage from "../kitchensink-components/HomestayPage";
import MobileProfilePage from "../kitchensink-components/MobileProfilePage";
import { SetResponsiveContainer } from "./SetResponsiveContainer";
import { useSelector } from "react-redux";
import useFetch from "../../components/hooks/APIsFunctions/useFetch";
import { GetProjectUrl, SetReoute } from "../../request";
import { GetCard } from "./GetCard";
import NodeMenuItemsSchema from "../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import MarketPlace from "../kitchensink-components/MarketPlace";
import { useEffect } from "react";
import { ConnectToWS } from "./ConnectToWS";

const RenderItemsView = ({ dashboardItemId, routePath }: any) => {
  // useEffect(() => {
  //   console.log("====================================");
  //   console.log("enterGetCard");
  //   console.log("====================================");
  //   // if(schema&&isOnline){
  //   // }
  // });
  GetCard(NodeMenuItemsSchema);

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
