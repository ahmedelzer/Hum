import { useDispatch, useSelector } from "react-redux";
import { SetReoute } from "../../../request";
import { onApply } from "../../components/form-container/OnApply";
import { addToCart } from "../../reducers/CartReducer";
import NodeMenuItemsSchema from "../../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import DeleteItem from "../../utils/operation/DeleteItem";
export const AddItemToCart = async (
  item,
  setLoading,
  fieldsType,
  schemaActions,
  quantity,
  dispatch
) => {
  SetReoute(NodeMenuItemsSchema.projectProxyRoute);
  setLoading(true);
  try {
    if (quantity <= 0) {
      const deleteAction = schemaActions?.find(
        (action) => action.dashboardFormActionMethodType === "Delete"
      );

      await DeleteItem(
        item[fieldsType.idField],
        dispatch(addToCart({ item: item, fieldsType: fieldsType })),
        true,
        deleteAction,
        NodeMenuItemsSchema.projectProxyRoute
      );
    } else {
      const postAction = schemaActions?.find(
        (action) => action.dashboardFormActionMethodType === "Post"
      );

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

      if (apply?.success) {
        dispatch(addToCart({ item, fieldsType }));
      }
    }
  } finally {
    setLoading(false);
  }
};
