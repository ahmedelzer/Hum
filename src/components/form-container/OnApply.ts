import APIHandling from "../../../components/hooks/APIsFunctions/APIHandling";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { useNetwork } from "../../../context/NetworkContext";
import { SetReoute } from "../../../request";
import { SharedLists } from "./SharedLists";
import { useErrorToast } from "./ShowErrorToast";

export const onApply = async (
  editedRow: { [x: string]: any },
  iDField: string | number,
  isNew: boolean,
  action: {},
  proxyRoute = "",
  schemaParameters = false,
  constants = {}
) => {
  // const { showErrorToast } = useErrorToast();
  // const { isOnline, checkNetwork } = useNetwork();
  // console.log(isOnline, "isOnline");

  // if (!isOnline) {
  //   showErrorToast("connection Error", "please connect to internet ");
  //   return null;
  // }
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

  const res = await APIHandling(
    dataSourceAPI(action),
    action.dashboardFormActionMethodType,
    body
  );
  return res;
};
