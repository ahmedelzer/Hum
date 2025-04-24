import { useSelector } from "react-redux";
import { SetReoute } from "../../../request";
import { onApply } from "../../components/form-container/OnApplay";
import { addToCart } from "../../reducers/CartReducer";
import NodeMenuItemsSchema from "../../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import DeleteItem from "../../utils/DeleteItem";
export const AddItemToCart = async (
  item,
  setLoading,
  dispatch,
  fieldsType,
  schemaActions,
  quantity
) => {
  SetReoute(NodeMenuItemsSchema.projectProxyRoute);
  // const cart = useSelector((state) => state.cart.cart);
  // const haveOnCart = cart.find((value) => {
  //   return value[fieldsType.idField] === item[fieldsType.idField];
  // });
  // const quantity = item[fieldsType.cardAction]
  //   ? item[fieldsType.cardAction]
  //   : 0;
  const postAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Post"
    );
  const deleteAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Delete"
    );
  setLoading(true);
  if (item.addQuantity < 0 && item[fieldsType.cardAction] === 1) {
    await DeleteItem(
      item[fieldsType.idField],
      dispatch(addToCart({ item: item, fieldsType: fieldsType })),
      true,
      deleteAction,
      NodeMenuItemsSchema.projectProxyRoute
    );
  } else {
    const apply = await onApply(
      {
        ...item,
        [fieldsType.cardAction]: quantity,
      },
      "",
      true,
      postAction,
      NodeMenuItemsSchema.projectProxyRoute
    );
    if (apply.data && apply.success) {
      dispatch(addToCart({ item: item, fieldsType: fieldsType }));
    }
  }
};
