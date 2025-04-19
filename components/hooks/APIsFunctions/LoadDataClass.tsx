import { SetHeaders } from "../../../request";

interface State {
  requestedSkip: number;
  take: number;
  lastQuery: string;
  loading: boolean;
}

interface Cache {
  getRows: (skip: number, take: number) => any[];
  setRows: (skip: number, data: any[]) => void;
}

type UpdateRowsFunction = (skip: number, take: number, count?: number) => void;
type DispatchFunction = (action: { type: string; payload?: any }) => void;
type DataSourceAPIFunction = (
  action: any,
  skip: number,
  take: number
) => string;

const activeControllers: Record<string, AbortController> = {}; // Track by query

export default class LoadDataService {
  async load(
    state: State,
    dataSourceAPI: DataSourceAPIFunction,
    getAction: any,
    cache: Cache,
    updateRows: UpdateRowsFunction,
    dispatch: DispatchFunction
  ): Promise<void> {
    const { requestedSkip, take, lastQuery, loading } = state;
    const query = dataSourceAPI(getAction, requestedSkip, take);

    if (!getAction) return;

    if (query !== lastQuery && !loading) {
      const cached = cache.getRows(requestedSkip, take);

      if (cached.length === take) {
        updateRows(requestedSkip, take);
      } else {
        dispatch({ type: "FETCH_INIT" });

        // Abort any previous fetch for the same query
        if (activeControllers[query]) {
          activeControllers[query].abort();
        }

        const controller = new AbortController();
        activeControllers[query] = controller;

        try {
          const headers = await SetHeaders();

          const response = await fetch(query, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...headers,
            },
            signal: controller.signal,
          });

          const { count, dataSource } = await response.json();

          cache.setRows(requestedSkip, dataSource);
          updateRows(requestedSkip, take, count);
        } catch (error: any) {
          if (error.name === "AbortError") {
            console.log("Request was aborted:", query);
          } else {
            console.error("Error during fetch:", error);
            dispatch({ type: "REQUEST_ERROR" });
          }
        } finally {
          delete activeControllers[query]; // Clean up controller
        }
      }

      dispatch({ type: "UPDATE_QUERY", payload: query });
    }
  }
}
