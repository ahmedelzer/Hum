//@ts-ignore
import { SmWeb } from "./Sm";
import { Col, Container, Row as WebRow } from "reactstrap";
import DataCellRender from "./DataCellRender";
import "./cols.css";
export const WebContainer = ({
  tableSchema,
  SetValue,
  control,
  errorResult,
  actionField,
  ...props
}) => {
  return (
    <div>
      {" "}
      <Container>
        <WebRow>
          {tableSchema?.dashboardFormSchemaParameters
            ?.filter((column: any) => !column.isIDField && column.isEnable)
            .map((param: any) => (
              <Col
                sm={SmWeb(param)}
                className={`px-2`}
                key={param.parameterField}
              >
                <DataCellRender
                  isActionField={
                    actionField === param.parameterField ? true : false
                  }
                  control={control}
                  data={param}
                  value={SetValue(param)}
                  onChange={() => {}}
                  errorResult={errorResult}
                  formSchemaParameters={
                    tableSchema?.dashboardFormSchemaParameters
                  }
                  {...props}
                />
              </Col>
            ))}
        </WebRow>
      </Container>
    </div>
  );
};
