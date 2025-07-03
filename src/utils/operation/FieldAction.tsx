import APIHandling from "../../../components/hooks/APIsFunctions/APIHandling";
import { GetProjectUrl, SetReoute } from "../../../request";

export default async function FieldAction(
  id,
  // modalIsOpen,
  // setModalIsOpen,
  value,
  action,
  proxyRoute
) {
  if (action) {
    SetReoute(proxyRoute);
    const actionRequest = await APIHandling(
      `${GetProjectUrl()}/${action.routeAdderss}/${id}`,
      action.dashboardFormActionMethodType.split(":")[1],
      value
    );
  }
}
