import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuView from "../components/menu-components/MenuView";
import HomestayPage from "../kitchensink-components/HomestayPage";
import MobileProfilePage from "../kitchensink-components/MobileProfilePage";
import { useGetDashboardForm } from "../services/react-query-hooks/GetDashboardForm";
import { SetResponsiveContainer } from "./SetResponsiveContainer";
import SettingsScreen from "../kitchensink-components/TestPage";
import MenuFilter from "../components/filters/MenuFilter";

const RenderItemsView = ({ dashboardItemId, routePath }: any) => {
  // return <MenuView dashboardItemId={dashboardItemId} />;
  const Stack = createNativeStackNavigator();

  const { data, isLoading, isSuccess } = useGetDashboardForm({
    dashboardItemId,
  });
  switch (routePath) {
    case "MenuView":
      return SetResponsiveContainer(<MenuView schemas={data} />, true);
    case "Home":
      return SetResponsiveContainer(<HomestayPage />, true);
    case "Profile":
      return SetResponsiveContainer(<MobileProfilePage />, true);
    // case "test":
    //   return SetResponsiveContainer(<SettingsScreen />, true);
    default:
      return <HomestayPage />;
  }
};

export default RenderItemsView;
