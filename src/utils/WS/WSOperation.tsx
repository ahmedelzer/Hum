import { keysToLowerFirstChar } from "../operation/keysToLowerFirstChar";
import { TotalCount } from "./UpdateTotalCountWS";

export function WSOperation(
  messageString,
  setReRequest,
  callback,
  idField,
  dataSourceName,
  rows,
  totalCount = 0
) {
  const message = JSON.parse(messageString);
  const payload = keysToLowerFirstChar(message[dataSourceName]);


  const handlers = {
    Insert: () => {
      const newRows = Array.isArray(payload) ? payload : [payload];
      if (!rows.find((row) => row[idField] === newRows[0][idField])) {
        return {
          rows: [...rows, ...newRows],
          totalCount: TotalCount(message.ope, totalCount),
        };
      }
    },
    Context: () => {
      callback();
    },
    Update: () => {
      const updatedRows = Array.isArray(rows)
        ? rows.map((row) =>
            row[idField] === payload[idField] ? { ...row, ...payload } : row
          )
        : [];
      return {
        rows: updatedRows,
        totalCount: TotalCount(totalCount, message.ope),
      };
    },
    Delete: () => {
      const newRows = rows.filter((row) => row[idField] !== message[dataSourceName]);
      return { rows: newRows, totalCount: TotalCount(message.ope, totalCount) };
    },

    // ReUpdate: () => setReRequest(true),
    // Fill: () => {}, // implement as needed
  };

  const operation = message.ope;
  const handler = handlers[operation];

  if (handler) {
    return handler();
  }

  return null;
}
