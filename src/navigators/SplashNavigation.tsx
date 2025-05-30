import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../components/splash/SplashScreen";
const Stack = createStackNavigator();
const SplashNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      {/* <Stack.Screen
        name="LanguageSelection"
        component={LanguageSelectionScreen}
      />
      <Stack.Screen name="Tutorial" component={TutorialScreen} />
      <Stack.Screen name="Home" component={HomeScreen} /> */}
    </Stack.Navigator>
  );
};

export default SplashNavigation;
