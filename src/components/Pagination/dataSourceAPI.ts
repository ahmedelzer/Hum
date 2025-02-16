import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";

export const dataSourceAPI = (query, skip, take) =>
  buildApiUrl(query, {
    pageIndex: skip + 1,
    pageSize: take,
    ...rowDetails,
  });
