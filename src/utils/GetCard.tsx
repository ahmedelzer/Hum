import { useDispatch, useSelector } from "react-redux";
import { setFields } from "../reducers/MenuItemReducer";
import useFetch from "../../components/hooks/APIsFunctions/useFetch";
import { GetProjectUrl, SetReoute } from "../../request";

export async function GetCard(schema) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const parameters = schema?.dashboardFormSchemaParameters ?? [];
  console.log("====================================");
  console.log("in GetCard");
  console.log("====================================");
  const getField = (type: string, includeField = true) =>
    parameters.find(
      (item: any) =>
        item?.parameterType === type &&
        (type !== "menuItemName" || !item.isIDField)
    )[includeField ? "parameterField" : undefined] ?? null;

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
  SetReoute(schema.projectProxyRoute);
  const {
    data: GetCustomerCart,
    error,
    isLoading,
  } = await useFetch("/ShopNode/GetOldCustomerCart", GetProjectUrl());
  console.log(GetCustomerCart, error, isLoading, "GetCustomerCart");
}
