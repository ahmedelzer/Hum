import { createStackNavigator } from "@react-navigation/stack";

import { RootStackParamList } from "./RootStack";

import GatesView from "../components/gatesContainer-components/GatesView";
import LiveGateView from "../components/liveGate-components/LiveGateView";
import LiveChatView from "../components/live-chat-view/LiveChatView";
import RoomsView from "../components/rooms-components/RoomsView";

const Stack = createStackNavigator<RootStackParamList>();

function Home({ navigation, route }: any) {
  return (
    <Stack.Navigator initialRouteName="RoomsView">
      <Stack.Screen
        name="RoomsView"
        component={RoomsView}
        // options={({route}) => ({
        //   headerTitle: (route as any)?.params?.alias,
        //   headerTitleAlign: 'center',
        //   headerLeftContainerStyle: {
        //     paddingLeft: 0,
        //   },
        // })}
      />
      <Stack.Screen
        name="LiveChatView"
        component={LiveChatView}
        // options={({route}) => ({
        //   headerTitle: (route as any)?.params?.alias,
        //   headerTitleAlign: 'center',
        //   headerLeftContainerStyle: {
        //     paddingLeft: 0,
        //   },
        // })}
      />
      {/* <Stack.Screen
        name="LiveGateView"
        component={LiveGateView}
        // options={({route}) => ({
        //   headerTitle: (route as any)?.params?.alias,
        //   headerTitleAlign: 'center',
        //   headerLeftContainerStyle: {
        //     paddingLeft: 0,
        //   },
        // })}
      /> */}
    </Stack.Navigator>
  );
}

export default Home;
