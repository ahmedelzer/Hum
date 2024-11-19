import { View, Text, StyleSheet } from "react-native";
//@ts-ignore
import { Column, Grid, Row } from "react-native-responsive-grid";
import { Sm } from "./Sm";

import DataCellRender from "./DataCellRender";

function FormContainer({ tableSchema, row, errorResult, control }: any) {
  const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
    (e: any) => e.isEnable
  ).parameterField;

  function SetValue(param: any) {
    if (param.lookupID) {
      return row;
    } else {
      return row[param.parameterField];
    }
  }

  return (
    <View style={styles.row}>
      <Grid>
        {({ state, setState }: any) => (
          <Row>
            {tableSchema?.dashboardFormSchemaParameters
              ?.filter((column: any) => !column.isIDField)
              .map((param: any) => (
                <Column
                  size={Sm(param)}
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
                    // value={SetValue(param) || ""}
                    onChange={() => {}}
                    errorResult={errorResult}
                  />
                </Column>
              ))}
          </Row>
        )}
      </Grid>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    display: "flex",
    flex: 1,
  },
  col: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    backgroundColor: "black",
  },
});
export default FormContainer;
