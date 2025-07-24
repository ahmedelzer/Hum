import { keysToLowerFirstChar } from "../../utils/operation/keysToLowerFirstChar";

export function getItemPackage(
  item = {},
  cartItems = [],
  nodeMenuItemsSchema = {},
  fieldsType = {}
) {
  const idField = nodeMenuItemsSchema?.idField;

  if (!idField || !item?.[idField] || cartItems.length === 0) {
    console.warn("⚠️ getItemPackage: Missing idField or item[idField]");
    return item;
  }

  // Find cartItem where its idField (with first char lowercased) matches item[idField]
  const matchingCartItem = cartItems.find((cartItem) => {
    const normalizedCartItem = cartItem;
    return normalizedCartItem?.[idField] === item?.[idField];
  });

  console.log("fieldsType", fieldsType);

  const result = {
    ...item,
    ...(fieldsType?.cardAction &&
      matchingCartItem && {
        ...matchingCartItem,
      }),
  };
  //console.log("getItemPackage",result);
  return result;
}
