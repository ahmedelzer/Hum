import { setCartFromStorage } from "../reducers/CartReducer";
import { setFields } from "../reducers/MenuItemReducer";

// Keep GetCard as pure function
export function GetCard(
  schema,
  GetCustomerCart = false,
  dispatch,
  cart,
  total
) {
  const parameters = schema?.dashboardFormSchemaParameters ?? [];

  const getField = (type: string, includeField = true) =>
    parameters.find(
      (item: any) =>
        item?.parameterType === type &&
        (type !== "menuItemName" || !item.isIDField)
    )?.[includeField ? "parameterField" : undefined] ?? null;

  const fieldsType = {
    imageView: getField("menuItemImage"),
    text: getField("menuItemName"),
    description: getField("menuItemDescription"),
    price: getField("price"),
    rate: getField("rate"),
    likes: getField("likes"),
    dislikes: getField("dislikes"),
    orders: getField("orders"),
    reviews: getField("reviews"),
    isAvailable: getField("isAvailable"),
    menuCategoryID: getField("menuCategoryID"),
    idField: schema.idField,
    dataSourceName: schema.dataSourceName,
    cardAction: getField("cardAction"),
  };

  dispatch(setFields(fieldsType));
  // if (cart.length === 0) {
  if (GetCustomerCart) {
    dispatch(
      setCartFromStorage({
        cart: [...GetCustomerCart.dataSource],
        totalAmount: total,
      })
    );
  }
  // }
}
