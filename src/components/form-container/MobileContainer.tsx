//@ts-ignore
import { Column, Grid, Row } from "react-native-responsive-grid";
import { SmMobile } from "./Sm";

import DataCellRender from "./DataCellRender";
export const MobileContainer = ({
  tableSchema,
  SetValue,
  control,
  errorResult,
  actionField,
}) => {
  return (
    <Grid>
      {({ state, setState }: any) => (
        <Row>
          {tableSchema?.dashboardFormSchemaParameters
            ?.filter((column: any) => !column.isIDField)
            .map((param: any) => (
              <Column
                size={SmMobile(param)}
                className="px-2"
                key={param.parameterField}
              >
                <DataCellRender
                  //@ts-ignore
                  isActionField={
                    actionField === param.parameterField ? true : false
                  }
                  control={control}
                  data={param}
                  value={SetValue(param)}
                  onChange={() => {}}
                  errorResult={errorResult}
                />
              </Column>
            ))}
        </Row>
      )}
    </Grid>
  );
};
