import { WSOperation } from "./WSOperation";

export const handleWSMessage = async ({
  _WSsetMessage,
  fieldsType,
  rows,
  totalCount,
  callbackReducerUpdate,
}) => {
  if (!JSON.parse(_WSsetMessage)[fieldsType.dataSourceName]) return; // Skip if no message
  console.log(_WSsetMessage, "_WSsetMessage after check", [
    fieldsType.dataSourceName,
  ]);

  try {
    console.log("📩 WS message received, processing...");
    console.log();

    // Process WebSocket message
    const ws_updatedRows = WSOperation(
      _WSsetMessage,
      () => {},
      () => {},
      fieldsType.idField,
      fieldsType.dataSourceName,
      rows,
      totalCount
    );

    if (ws_updatedRows?.rows?.length > 0) {
      await callbackReducerUpdate(ws_updatedRows);
    }
  } catch (e) {
    console.error("❌ WebSocket message processing failed:", e);
  }
};
