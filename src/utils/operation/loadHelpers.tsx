import LoadData from "../../../components/hooks/APIsFunctions/LoadData";
import { updateRows } from "../../components/Pagination/updateRows";

export const prepareLoad = ({ state, dataSourceAPI, getAction, cache, reducerDispatch }) => {
  const updateFn = updateRows(reducerDispatch, cache, state);
  LoadData(state, dataSourceAPI, getAction, cache, updateFn, reducerDispatch);
};