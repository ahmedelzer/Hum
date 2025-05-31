import APIHandling from "../../../components/hooks/APIsFunctions/APIHandling";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { SetReoute } from "../../../request";
import { SharedLists } from "./SharedLists";

export const onApply = async (
  editedRow: { [x: string]: any },
  iDField: string | number,
  isNew: boolean,
  action: {},
  proxyRoute = "",
  schemaParameters = false,constants={}
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
  const dataSourceAPI = (query) => {
          return buildApiUrl(query, constants);
        }; 
        console.log("dataSourceAPI",dataSourceAPI(action))
  const res = await APIHandling(
    dataSourceAPI(action),
    action.dashboardFormActionMethodType,
    body
  );
  return res;
};
