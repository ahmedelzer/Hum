import { GetToken } from "../../request";
import WSSchemaAction from "../Schemas/WSSchema/WSSchemaAction.json";
import { disconnectWS, getWSInstance } from "./WSManager";
import { WSOperation } from "./WSOperation";

export async function ConnectToWS(
  setWSsetMessage,
  languageID = "e2b6bd4f-a30b-4d70-ae80-f510479a45eb",
  nodeID = "2421D86A-0043-441B-988A-E7CFAD6273A7"
) {
  const token = await GetToken();

  if (!token) {
    console.warn("🛑 No token found, skipping WebSocket connection");
    return;
  }

  const url = `/${WSSchemaAction.routeAdderss}?token=${token}&languageID=${languageID}&nodeID=${nodeID}`;

  const handleMessage = (WSMessage) => {
    try {
      const bufferObj = JSON.parse(WSMessage);
      const byteArray = new Uint8Array(bufferObj.data);
      const urlEncodedString = new TextDecoder().decode(byteArray);
      const decodedString = decodeURIComponent(urlEncodedString);
      setWSsetMessage(decodedString);
      console.log("🔔 Incoming message decoded:", decodedString);
    } catch (err) {
      console.error("❌ Failed to decode WebSocket message:", err);
    }
  };

  getWSInstance(url, handleMessage); // ✅ callback is set here

  return () => {
    disconnectWS();
  };
}
