import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStack";
import HeaderTabs from "./HeaderTabs";
import ChatScreen from "../screens/ChatScreen";
import QrScreen from "../screens/QrScaanScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import OtherUserProfile from "../screens/OtherUserProfile";
import * as Animatable from "react-native-animatable";
import RoomsScreen from "../screens/NetworkScreen/RoomsScreen";
import MeetingScreen from "../screens/NetworkScreen/MeetingScreen";
import CalendarTabs from "./LiveGateStack";

const Stack = createStackNavigator<RootStackParamList>();

function ChatMessages() {
  return (
    <Animatable.View animation="fadeIn" duration={200} style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="MessagesScreen"
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="MessagesScreen" component={HeaderTabs} />
        <Stack.Screen name="QrScreen" component={QrScreen} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="RoomsScreen" component={RoomsScreen} />
        <Stack.Screen name="CalendarTabs" component={CalendarTabs} />

        <Stack.Screen name="MeetingScreen" component={MeetingScreen} />
      </Stack.Navigator>
    </Animatable.View>
  );
}

export default ChatMessages;
1;
