import { createStackNavigator } from "@react-navigation/stack";

import { RootStackParamList } from "./RootStack";

import CalendarTabs from "./LiveGateStack";
import GatesView from "../components/gatesContainer-components/GatesView";
import LiveGateView from "../components/liveGate-components/LiveGateView";

const Stack = createStackNavigator<RootStackParamList>();

function LiveGateStack({ navigation, route }: any) {
  return (
    <Stack.Navigator initialRouteName="LiveGateView">
      <Stack.Screen
        name="LiveGateView"
        component={LiveGateView}
        // options={({route}) => ({
        //   headerTitle: (route as any)?.params?.alias,
        //   headerTitleAlign: 'center',
        //   headerLeftContainerStyle: {
        //     paddingLeft: 0,
        //   },
        // })}
      />
    </Stack.Navigator>
  );
}

export default LiveGateStack;
