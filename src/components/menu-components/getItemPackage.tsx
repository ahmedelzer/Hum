import { keysToLowerFirstChar } from "../../utils/operation/keysToLowerFirstChar";

export function getItemPackage(
  item = {},
  cartItems = [],
  nodeMenuItemsSchema = {}
) {
  const idField = nodeMenuItemsSchema?.idField;
  console.log(cartItems, "cartItems form getItemPackage");

  if (!idField || !item?.[idField]) {
    console.warn("⚠️ getItemPackage: Missing idField or item[idField]");
    return item;
  }

  // Find cartItem where its idField (with first char lowercased) matches item[idField]
  const matchingCartItem = cartItems.find((cartItem) => {
    const normalizedCartItem = cartItem;
    return normalizedCartItem?.[idField] === item?.[idField];
  });

  //console.log("matchingCartItem",matchingCartItem,);
  const result = {
    ...item,
    ...matchingCartItem,
  };
  //console.log("getItemPackage",result);
  return result;
}
