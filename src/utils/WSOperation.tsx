export function WSOperation(message, prvMessages, callback, idField?: any) {
  switch (message.ope) {
    case "Insert": {
      callback([...prvMessages, message]);
      break;
    }
    case "context": {
      callback();
      break;
    }
    case "Update": {
      const update = prvMessages.find(
        (mess) => mess[idField] === message[idField]
      );

      break;
    }
    case "Delete": {
      //   let Delete = state.rows.find(
      //     (row) => row[schema.idField] === data[getAction.returnPropertyName]
      //   );
      //   Delete = null;
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
