import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import {
  baseURL,
  GetToken,
  projectProxyRoute,
  websocketBaseURI,
} from "../../../request";
import defWSSchemaAction from "../../Schemas/WSSchema/WSSchemaAction.json";
import { disconnectWS, getWSInstance } from "./WSManager";

export async function ConnectToWS(
  setWSsetMessage,
  setWS_Connected,
  row = {},
  wS_SchemaAction = defWSSchemaAction,
  proxyRoute = projectProxyRoute
) {
  const token = await GetToken();

  if (!token) {
    console.warn("🛑 No token found, skipping WebSocket connection");
    return;
  }
  const buildUrl = buildApiUrl(
    wS_SchemaAction,
    {
      ...row,
      token: token,
    },
    websocketBaseURI + "/" + proxyRoute
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

  // Get instance and handler remover
  const { removeHandler } = getWSInstance(
    websocketBaseURI + "/" + proxyRoute + "/" + wS_SchemaAction.routeAdderss,
    buildUrl,
    handleMessage
  );
  setWS_Connected(true);

  // Return cleanup function
  return () => {
    removeHandler(); // Remove this specific handler
    disconnectWS(buildUrl); // Will only disconnect if no handlers left

    // Optional: Store last received message
    AsyncStorage.setItem("lastWSMessage", JSON.stringify(WSMessage)).catch(
      (err) => console.error("Failed to store last message:", err)
    );
  };
}
