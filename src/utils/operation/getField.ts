export const getField = (parameters, type: string, includeField = true) =>
  parameters.find(
    (item: any) =>
      item?.parameterType === type &&
      (type !== "menuItemName" || !item.isIDField)
  )?.[includeField ? "parameterField" : undefined] ?? null;
