export function OpeningInPopup(schema) {
  if (!schema?.schemaType) return { openInPopup: false, splitSchemaType: "" };

  const splitSchemaType = schema?.schemaType.split("OpeningInPopup");

  var openInPopup = false;
  if (splitSchemaType.length > 1) {
    openInPopup = true;
  }
  return { openInPopup: openInPopup, splitSchemaType: splitSchemaType[0] };
}
