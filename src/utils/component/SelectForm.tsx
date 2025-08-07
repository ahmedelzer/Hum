import FormContainer from "../../components/form-container/FormContainer";
import DynamicTable from "../../components/table/DynamicTable";
export default function SelectForm({
  row,
  schemas,
  data,
  schemaID,
  control,
  errorResult = {},
}) {
  console.log("before DynamicTable", schemas, schemaID);
  const schema = schemas.find(
    (schema) => schema.dashboardFormSchemaID === schemaID
  );

  console.log("in DynamicTable", schema, schema.schemaType.startsWith("Form"));
  if (schema?.schemaType.startsWith("Table")) {
    return <DynamicTable key={schema.idField} schemas={schemas} data={data} />;
  } else if (schema.schemaType.startsWith("Form")) {
    return (
      <FormContainer
        tableSchema={schema}
        row={{}}
        errorResult={errorResult}
        control={control}
      />
    );
  }
}
