import APIHandling from "../../../components/hooks/APIsFunctions/APIHandling";
import { SetReoute } from "../../../request";
import { SharedLists } from "./SharedLists";

export const onApply = async (
  editedRow: { [x: string]: any },
  iDField: string | number,
  isNew: boolean,
  action: {},
  proxyRoute = "",
  schemaParameters = false,
  query = ""
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
