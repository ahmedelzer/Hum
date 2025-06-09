import APIHandling from "../../../components/hooks/APIsFunctions/APIHandling";
import { GetProjectUrl, SetReoute } from "../../../request";


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
      `${GetProjectUrl()}/${action.routeAdderss}/${id}`,
      action.dashboardFormActionMethodType,
      ""
    );
    console.log("deleteRequest:",deleteRequest);
    if (deleteRequest.data && deleteRequest.success) {
      DeleteItemCallback();
    }
  } else {
    DeleteItemCallback(id);
  }
}