import LoadData from "../../../components/hooks/APIsFunctions/LoadData";
import { updateRows } from "../../components/Pagination/updateRows";

const prepareLoad =async ({
  state,
  dataSourceAPI,
  getAction,
  cache,
  reducerDispatch,
}) => {
  LoadData(
    state,
    dataSourceAPI,
    getAction,
    cache,
    updateRows(reducerDispatch, cache, state),
    reducerDispatch
  );
};
