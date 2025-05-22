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
  const payload = message[dataSourceName];
  console.log(message, payload, "payload");

  const updated = keysToLowerFirstChar(payload);
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
      const updatedRows = rows.map(
        (row) => {
          return row[idField] === updated[idField]
            ? { ...row, ...updated }
            : row;
        }

        // row[idField] === updatedRow[idField] ? { ...row, ...updatedRow } : row
      );
      console.log(updatedRows, "updatedRows");

      return {
        rows: updatedRows,
        totalCount: TotalCount(totalCount, message.ope),
      };
    },
    Delete: () => {
      const newRows = rows.filter((row) => row[idField] !== payload[idField]);
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
