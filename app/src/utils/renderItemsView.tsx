import MenuView from "../components/menu-components/MenuView";
import HomestayPage from "../kitchensink-components/HomestayPage";
import MobileProfilePage from "../kitchensink-components/MobileProfilePage";
import TestPage from "../kitchensink-components/TestPage";
import { useGetDashboardForm } from "../services/react-query-hooks/GetDashboardForm";

const RenderItemsView = ({ dashboardItemId, routePath }: any) => {
  // return <MenuView dashboardItemId={dashboardItemId} />;
  const { data, isLoading, isSuccess } = useGetDashboardForm({
    dashboardItemId,
  });

  switch (routePath) {
    case "dynamicMenuItemsView":
      return <MenuView schemas={data} />;
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
