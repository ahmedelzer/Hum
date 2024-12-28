// import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import APIHandling from "../../../components/hooks/APIsFunctions/APIHandling";
import { SetReoute } from "../../../request";
import { SharedLists } from "./SharedLists";
// import APIHandling from "../../hooks/APIsFunctions/APIHandling";

export const onApply = async (
  editedRow,
  iDField,
  isNew,
  action,
  proxyRoute,
  schemaParameters = false,
  query
) => {
  let row = schemaParameters
    ? SharedLists(editedRow, schemaParameters, "parameterField")
    : null;
  if (row) editedRow = row;
  const body = isNew
    ? editedRow
    : {
        entityID: `${editedRow[iDField]}`,
        ...{ patchJSON: editedRow },
      };
  proxyRoute && SetReoute(proxyRoute);
  const res = await APIHandling(
    action.routeAdderss,
    action.dashboardFormActionMethodType,
    body,
    query
  );

  return res;
};
