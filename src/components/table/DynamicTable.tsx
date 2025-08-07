import React, { Children, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View, Text, Button } from "react-native";
import { Table, Row } from "react-native-table-component";
import { Box } from "../../../components/ui";
import { RenderCell } from "./RenderCell";
import { theme } from "../../Theme";
import DisplayDetilsItems from "../../kitchensink-components/profile/DisplayDetilsItems";
import { GetColWidth } from "./GetColWidth";

const DynamicTable = ({ schemas, data }) => {
  // const mainSchema = schemas?.find((item) => item.isMainSchema);
  // const subSchemas = schemas?.filter((item) => !item.isMainSchema);

  const mainSchema = schemas[0];
  const subSchemas = schemas.filter((schema, index) => index !== 0);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    if (!mainSchema?.dashboardFormSchemaParameters) return;

    const dynamicColumns = mainSchema.dashboardFormSchemaParameters
      .filter((param) => !param.isIDField) // Exclude ID fields
      .map((param) => ({
        name: param.parameterField,
        title: param.parameterTitel,
        type: param.parameterType,
        lookupID: param.lookupID,
        colWidth: GetColWidth(param),
        getCellValue: (row) =>
          row[param.lookupID ? param.lookupDisplayField : param.parameterField],
      }));

    setColumns([
      ...dynamicColumns,
      // Optional additional columns
      // { name: "switchAction", title: "Switch" },
    ]);
  }, [schemas]);
  const tableHead = columns.map((col) => col.title);
  const [child, setChild] = useState(null);
  const [expandedRow, setExpandedRow] = useState({});

  return (
    <ScrollView horizontal>
      <Box className="p-2 bg-body rounded-lg w-auto">
        <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
          <Row
            data={tableHead}
            style={{
              height: 40,
              backgroundColor: theme.accent,
              color: theme.body,
              //justifyContent: "center",
            }}
            textStyle={{
              fontWeight: "bold",
              color: theme.body,
              fontSize: 12,
              width: 100,
              // display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />

          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: "#c8e1ff",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                }}
              >
                {columns.map((col, colIndex) => (
                  <View
                    key={colIndex}
                    style={{
                      width: col.colWidth,
                      paddingHorizontal: 4,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RenderCell
                      col={col}
                      row={row}
                      value={row[col.name]}
                      setChild={setChild}
                      setExpandedRow={setExpandedRow}
                      schemas={subSchemas}
                      child={child}
                    />
                  </View>
                ))}
              </View>
              {child && expandedRow === row && (
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: "#c8e1ff",
                  }}
                >
                  <ScrollView horizontal>
                    <View style={{ flexDirection: "row" }}>
                      {/** Optional: match child layout width with column widths if needed */}
                      {child}
                    </View>
                  </ScrollView>
                </View>
              )}
            </React.Fragment>
          ))}
        </Table>
      </Box>
    </ScrollView>
  );
};

export default DynamicTable;
