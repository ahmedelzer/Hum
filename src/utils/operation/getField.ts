export const getField = (parameters, type: string, includeField = true) => {
  const item = parameters.find(
    (item: any) => item?.parameterType === type && !item.isIDField
  );

  if (!item) return null;

  return includeField ? item.parameterField : item;
};
