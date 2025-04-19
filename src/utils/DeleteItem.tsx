import APIHandling from "../../components/hooks/APIsFunctions/APIHandling";
import { SetReoute } from "../../request";

export default async function DeleteItem(
  id,
  // modalIsOpen,
  // setModalIsOpen,
  DeleteItemCallback,
  deleteWithApi,
  action,
  proxyRoute
) {
  if (deleteWithApi) {
    SetReoute(proxyRoute);
    const deleteRequest = await APIHandling(
      action.routeAdderss + "/" + id,
      action.dashboardFormActionMethodType,
      ""
    );
    if (deleteRequest.data && deleteRequest.success) {
      DeleteItemCallback();
    }
  } else {
    DeleteItemCallback(id);
  }
}
