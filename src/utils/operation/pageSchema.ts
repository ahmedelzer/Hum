export function pageSchema(setSchemaSate, pageSchemas, schemaType) {
  setSchemaSate(pageSchemas.find((schema) => schema.schemaType === schemaType));
}
