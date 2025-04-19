export function WSOperation(
  messageString,
  setReRequest,
  reducerDispatch,
  prvMessages,
  callback,
  idField?: any,
  dataSourceName,
  rows
) {
  // const message = messageString;
  const message = JSON.parse(messageString);
  // console.log(message, message.ope, message.notifications);

  switch (message.ope) {
    case "Insert": {
      callback([...prvMessages, message]);
      break;
    }
    case "Context": {
      callback();
      break;
    }
    case "Update": {
      const update = prvMessages.find(
        (mess) => mess[idField] === message[idField]
      );

      break;
    }
    case "ReUpdate": {
      setReRequest(true);

      break;
    }
    case "Delete": {
      console.log("enter delete");
      const newRows = rows.filter((removeItem) => {
        return removeItem[idField] !== message[dataSourceName];
      });
      reducerDispatch({
        type: "WS_DELETE_ROW",
        payload: {
          rows: newRows,
        },
      });
      break;
    }
    case "Fill": {
      //   state.rows = data[getAction.returnPropertyName];

      break;
    }
    default: {
      return null;
    }
  }
}
