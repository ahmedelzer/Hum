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
  schemaActions
) => {
  SetReoute(NodeMenuItemsSchema.projectProxyRoute);
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
  if (item.addQuantity < 0 && item.quantity === 1) {
    await DeleteItem(
      item[fieldsType.idField],
      dispatch(addToCart({ item: item, fieldsType: fieldsType })),
      true,
      deleteAction,
      NodeMenuItemsSchema.projectProxyRoute
    );
  } else {
    const apply = await onApply(
      { ...item },
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
