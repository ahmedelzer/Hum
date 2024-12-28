import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStack";
import ResetPassword from "../screens/auth/ResetPassword";
import CalendarTabs from "./LiveGateStack";
import UserProfileScreen from "../screens/UserProfileScreen";
import ProfileScreenView from "../screens/ProfileScreen/ProfileScreen";
import UserCalendarView from "../components/UserMeetings/UserCalendarView";
import * as Animatable from "react-native-animatable";
import EditPersonalProfile from "../screens/EditPersonalProfile";

const Stack = createStackNavigator<RootStackParamList>();

function Profile({ route }: any) {
  return (
    <Animatable.View animation="fadeIn" duration={200} style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreenView} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        <Stack.Screen name="CalendarTabs" component={CalendarTabs} />
        <Stack.Screen name="UserCalendarView" component={UserCalendarView} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen
          name="EditPersonalProfile"
          component={EditPersonalProfile}
        />
      </Stack.Navigator>
    </Animatable.View>
  );
}

export default Profile;
