import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuView from "../components/menu-components/MenuView";
import ResponsiveContainer from "../kitchensink-components/auth/layout/ResponsiveContainer";
import HomeScreen from "../kitchensink-components/cart/h";
import HomestayPage from "../kitchensink-components/HomestayPage";
import MobileProfilePage from "../kitchensink-components/MobileProfilePage";
import TestPage from "../kitchensink-components/TestPage";
import { useGetDashboardForm } from "../services/react-query-hooks/GetDashboardForm";
import CartPage from "../kitchensink-components/cart/CartPage";

const RenderItemsView = ({ dashboardItemId, routePath }: any) => {
  // return <MenuView dashboardItemId={dashboardItemId} />;
  const Stack = createNativeStackNavigator();

  const { data, isLoading, isSuccess } = useGetDashboardForm({
    dashboardItemId,
  });
  const TestStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Cart" component={CartPage} />
    </Stack.Navigator>
  );
  const SetResponsiveContainer = (screen, setMarginBottom = true) => {
    return (
      <ResponsiveContainer style={""} setMarginBottom={setMarginBottom}>
        {screen}
      </ResponsiveContainer>
    );
  };
  switch (routePath) {
    case "dynamicMenuItemsView":
      return SetResponsiveContainer(<MenuView schemas={data} />);
    case "Home":
      return SetResponsiveContainer(<HomestayPage />, false);
    case "Profile":
      return <MobileProfilePage />;
    case "test":
      return <HomeScreen />;
    default:
      return <HomestayPage />;
  }
};

export default RenderItemsView;
