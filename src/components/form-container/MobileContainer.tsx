//@ts-ignore
import { Column, Grid, Row } from "react-native-responsive-grid";
import { SmMobile } from "./Sm";
import avoidColsTypes from "../form-container/avoidColsTypes.json";
import DataCellRender from "./DataCellRender";
import { View } from "react-native";
export const MobileContainer = ({
  tableSchema,
  SetValue,
  control,
  errorResult,
  actionField,
  ...props
}) => {
  return (
    <Grid>
      {({ state, setState }: any) => (
        <Row>
          {tableSchema?.dashboardFormSchemaParameters
            ?.filter((column) => {
              return (
                (!column.isIDField || column.lookupID) &&
                !avoidColsTypes.find(
                  (columnType) => column.parameterType === columnType
                )
              );
            })
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
                  formSchemaParameters={
                    tableSchema?.dashboardFormSchemaParameters
                  }
                  {...props}
                />
              </Column>
            ))}
        </Row>
      )}
    </Grid>
  );
};
