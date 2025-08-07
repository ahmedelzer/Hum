export const GetColWidth = (col) => {
  switch (col?.parameterType) {
    case "date":
      return 150;

    case "number":
      return 120;

    case "detailsCell":
      return 100;

    case "text":
    default:
      return 100;
  }
};
