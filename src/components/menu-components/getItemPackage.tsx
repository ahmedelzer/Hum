import { keysToLowerFirstChar } from "../../utils/operation/keysToLowerFirstChar";

export function getItemPackage(item = {}, cartItems = [], nodeMenuItem = {}) {
  const idField = nodeMenuItem?.idField;

  if (!idField || !item?.[idField]) {
    console.warn("⚠️ getItemPackage: Missing idField or item[idField]");
    return item;
  }

  // Find cartItem where its idField (with first char lowercased) matches item[idField]
  const matchingCartItem = cartItems.find((cartItem) => {
    const normalizedCartItem = cartItem;
    return normalizedCartItem?.[idField] === item?.[idField];
  });



  return {
    ...item,
    ...matchingCartItem,
  };
}

