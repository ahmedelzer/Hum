import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStack";
import ChatScreen from "../screens/ChatScreen";
import HeaderTabs from "./HeaderTabs";
import UserProfileScreen from "../screens/UserProfileScreen";
import MeetingScreen from "../screens/NetworkScreen/MeetingScreen";
import OtherUserProfile from "../screens/OtherUserProfile";
import * as Animatable from "react-native-animatable";
import RoomsScreen from "../screens/NetworkScreen/RoomsScreen";
import NetworkScreenView from "../screens/NetworkScreen/NetworkScreen";
import CalendarTabs from "./LiveGateStack";

const Stack = createStackNavigator<RootStackParamList>();

function Messages() {
  return (
    <Animatable.View animation="fadeIn" duration={200} style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="NetworkScreen"
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="NetworkScreen" component={NetworkScreenView} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="MessagesScreen" component={HeaderTabs} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
        <Stack.Screen name="MeetingScreen" component={MeetingScreen} />
        <Stack.Screen name="RoomsScreen" component={RoomsScreen} />
        <Stack.Screen name="CalendarTabs" component={CalendarTabs} />
      </Stack.Navigator>
    </Animatable.View>
  );
}

export default Messages;
