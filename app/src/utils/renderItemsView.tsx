import MenuView from "../components/menu-components/MenuView";
import ResponsiveContainer from "../kitchensink-components/auth/layout/ResponsiveContainer";
import HomestayPage from "../kitchensink-components/HomestayPage";
import MobileProfilePage from "../kitchensink-components/MobileProfilePage";
import TestPage from "../kitchensink-components/TestPage";
import { useGetDashboardForm } from "../services/react-query-hooks/GetDashboardForm";

const RenderItemsView = ({ dashboardItemId, routePath }: any) => {
  // return <MenuView dashboardItemId={dashboardItemId} />;
  const { data, isLoading, isSuccess } = useGetDashboardForm({
    dashboardItemId,
  });
  console.log(data);
  const SetResponsiveContainer = (screen) => {
    return <ResponsiveContainer style={""}>{screen}</ResponsiveContainer>;
  };
  switch (routePath) {
    case "dynamicMenuItemsView":
      return SetResponsiveContainer(<MenuView schemas={data} />);
    case "Home":
      return <HomestayPage />;
    case "Profile":
      return <MobileProfilePage />;
    case "test":
      return <TestPage />;
    default:
      return <HomestayPage />;
  }
};

export default RenderItemsView;
