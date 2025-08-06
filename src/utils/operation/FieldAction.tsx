import APIHandling from "../../../components/hooks/APIsFunctions/APIHandling";
import { GetProjectUrl } from "../../../request";

export default async function FieldAction(
  id,
  // modalIsOpen,
  // setModalIsOpen,
  value,
  action,
  proxyRoute
) {
  if (action) {
    const actionRequest = await APIHandling(
      `${GetProjectUrl(proxyRoute)}/${action.routeAdderss}/${id}`,
      action.dashboardFormActionMethodType.split(":")[1],
      value
    );
  }
}
