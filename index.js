import "react-native-gesture-handler";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import App from "./App";

registerRootComponent(gestureHandlerRootHOC(App));
