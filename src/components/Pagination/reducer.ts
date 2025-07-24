function reducer(state, { type, payload }) {
  
  switch (type) {
    case "UPDATE_ROWS":
      return {
        ...state,
        rows: Array.from(
          new Map(
            [...state?.rows, ...payload?.rows].map((item) => [
              item[state.key],
              item,
            ])
          ).values()
        ), // Append new rows to the existing rows
        totalCount: payload.totalCount,
        loading: false,
      };
    case "WS_OPE_ROW":
      
      const result =  {
        ...state,
        rows: [...payload.rows],
        totalCount: payload.totalCount,
        loading: false,
      };

      return result;
    case "START_LOADING":
      return {
        ...state,
        requestedSkip: payload.requestedSkip,
        take: payload.take,
      };
    case "RESET_SERVICE_LIST":
      return {
        ...state,
        rows: [], // Clear existing services
        skip: 0,
        requestedSkip: 0, // Reset pagination
        totalCount: 0,
        loading: true, // Set loading to true so that new data can be fetched
      };
    case "REQUEST_ERROR":
      return {
        ...state,
        loading: false,
      };
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_QUERY":
      return {
        ...state,
        lastQuery: payload,
      };

    default:
      return state;
  }
}
export default reducer;
