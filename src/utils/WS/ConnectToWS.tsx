import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import {
  baseURL,
  GetToken,
  projectProxyRoute,
  websocketBaseURI,
} from "../../../request";
import WSSchemaAction from "../../Schemas/WSSchema/WSSchemaAction.json";
import { disconnectWS, getWSInstance } from "./WSManager";
import { WSOperation } from "./WSOperation";
import { selectSelectedNode } from "../../reducers/LocationReducer";
import store from "../../store/reduxStore"; // ⬅️ your Redux store

export async function ConnectToWS(setWSsetMessage, setWS_Connected, row = {}) {
  const selectedNode = selectSelectedNode(store.getState());
  const selectedLocation = store.getState().location.selectedLocation;
  const token = await GetToken();
  const languageRow = await AsyncStorage.getItem("languageRow");
  const languageRowObj =
    typeof languageRow === "string" ? JSON.parse(languageRow) : languageRow;
  if (!token) {
    console.warn("🛑 No token found, skipping WebSocket connection");
    return;
  }
  const buildUrl = buildApiUrl(
    WSSchemaAction,
    {
      ...row,
      token: token,
      ...languageRowObj,
      ...selectedNode,
      ...selectedLocation,
    },
    websocketBaseURI + "/" + projectProxyRoute
  );

  const handleMessage = (WSMessage) => {
    try {
      const bufferObj = JSON.parse(WSMessage);
      const byteArray = new Uint8Array(bufferObj.data);
      const urlEncodedString = new TextDecoder().decode(byteArray);
      const decodedString = decodeURIComponent(urlEncodedString);
      setWSsetMessage(() => decodedString);
      console.log("🔔 Incoming message decoded:", decodedString);
    } catch (err) {
      console.error("❌ Failed to decode WebSocket message:", err);
    }
  };

  getWSInstance(buildUrl, handleMessage, WSSchemaAction.routeAdderss); // ✅ callback is set here
  setWS_Connected(true);
  return () => {
    disconnectWS();
  };
}
