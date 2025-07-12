import { setCartFromStorage } from "../../reducers/CartReducer";
import { setFields } from "../../reducers/MenuItemReducer";
import { getField } from "./getField";

// Keep GetCard as pure function
export function GetCard(
  schema,
  GetCustomerCart = false,
  dispatch,
  cart,
  total
) {
  const parameters = schema?.dashboardFormSchemaParameters ?? [];

  const fieldsType = {
    imageView: getField(parameters, "menuItemImage"),
    text: getField(parameters, "menuItemName"),
    description: getField(parameters, "menuItemDescription"),
    price: getField(parameters, "price"),
    rate: getField(parameters, "rate"),
    likes: getField(parameters, "likes"),
    dislikes: getField(parameters, "dislikes"),
    orders: getField(parameters, "orders"),
    reviews: getField(parameters, "reviews"),
    isAvailable: getField(parameters, "isAvailable"),
    menuCategoryID: getField(parameters, "menuCategoryID"),
    discount: getField(parameters, "discount"),
    priceAfterDiscount: getField(parameters, "priceAfterDiscount"),
    rewardPoints: getField(parameters, "rewardPoints"),
    indexOfInteraction: getField(parameters, "indexOfInteraction"),
    idField: schema.idField,
    dataSourceName: schema.dataSourceName,
    cardAction: getField(parameters, "cardAction"),
    cartIdField: getField(parameters, "cartIdField"),
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
