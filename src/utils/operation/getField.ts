export const getField = (parameters, type: string, includeField = true) => {
  const item = parameters.find(
    (item: any) =>
      item?.parameterType === type &&
      (type !== "menuItemName" || !item.isIDField)
  );

  if (!item) return null;

  return includeField ? item.parameterField : item;
};
