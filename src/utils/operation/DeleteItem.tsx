import APIHandling from "../../../components/hooks/APIsFunctions/APIHandling";
import { GetProjectUrl } from "../../../request";
import { onApply } from "../../components/form-container/OnApply";

export default async function DeleteItem(
  id,
  deleteWithApi,
  action,
  proxyRoute
) {
  if (!action || !id) return false;

  const modifiedDeleteAction = {
    ...action,
    routeAdderss: `${action.routeAdderss}/${id}`,
  };

  try {
    const apply = await onApply(
      {},
      null,
      true,
      modifiedDeleteAction
    );

    if (apply?.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("❌ DeleteItem error:", error);
    return false;
  }
}
