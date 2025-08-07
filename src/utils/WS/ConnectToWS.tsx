import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import {
  baseURL,
  GetToken,

  websocketBaseURI,
} from "../../../request";
import defWSSchemaAction from "../../Schemas/WSSchema/WSSchemaAction.json";
import { disconnectWS, getWSInstance } from "./WSManager";

export async function ConnectToWS(
  setWSsetMessage,
  setWS_Connected,
  row = {},
  wS_SchemaAction = defWSSchemaAction
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
    websocketBaseURI + "/" + wS_SchemaAction.projectProxyRoute
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
  const baseURL =
    websocketBaseURI + "/" +  wS_SchemaAction.projectProxyRoute + "/" + wS_SchemaAction.routeAdderss;
  // Get instance and handler remover
  const { removeHandler } = getWSInstance(baseURL, buildUrl, handleMessage);

  setWS_Connected(true);

  // Return cleanup function
  return () => {
    try {
      removeHandler(); // Remove this specific handler
      disconnectWS(baseURL); // Use baseUrl
      setWS_Connected(false);
    } catch (err) {
      console.error("❌ Failed to cleanup WebSocket:", err);
    }
    // Store last received message
    // if (decodedString) {
    //   AsyncStorage.setItem("lastWSMessage", JSON.stringify(decodedString)).catch(
    //     (err) => console.error("Failed to store last message:", err)
    //   );
  };
}
