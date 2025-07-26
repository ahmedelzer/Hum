// components/CardSchema.jsx
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import avoidColsTypes from "../form-container/avoidColsTypes.json";
import { Button } from "../../../components/ui";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../Theme";
import DisplayDetilsItems from "../../kitchensink-components/profile/DisplayDetilsItems";

const CardSchema = ({ schemas, row }) => {
  var schema = schemas[0];
  const title = schema.dashboardFormSchemaInfoDTOView?.schemaHeader;
  const [child, setChild] = useState(null);
  const [expandedRow, setExpandedRow] = useState({});
  return (
    <View className="bg-body p-4 rounded-2xl mb-4 shadow">
      {title && <Text className="text-lg font-bold mb-2">{title}</Text>}
      <View className="space-y-1">
        {schema?.dashboardFormSchemaParameters
          ?.filter((column: any) => !column.isIDField && column.isEnable)
          ?.map((param) => {
            const value = row[param.parameterField];
            // if (!value) return null;

            return (
              // <Text
              //   key={param.dashboardFormSchemaParameterID}
              //   className="text-base text-text"
              // >
              //   {param.parameterTitel}:{" "}
              //   <Text className="font-semibold text-accent">
              //     {typeof value === "number" ? `${value.toFixed(2)}` : `${value}`}
              //   </Text>
              // </Text>
              <View>
                <DisplayItem
                  child={child}
                  setChild={setChild}
                  setExpandedRow={setExpandedRow}
                  schemas={schemas}
                  param={param}
                  value={value}
                />
                {child && expandedRow === param && (
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
              </View>
            );
          })}
      </View>
    </View>
  );
};
const DisplayItem = ({
  schemas,
  param,
  value,
  setExpandedRow,
  setChild,
  child,
}) => {
  const subSchemas = schemas.filter((schema, index) => index !== 0);

  console.log(param.parameterType === "detailsCell", "parameterType");

  switch (param.parameterType) {
    case "text":
      return (
        <Text
          key={param.dashboardFormSchemaParameterID}
          className="text-base text-text"
        >
          {param.parameterTitel}:{" "}
          <Text className="font-semibold text-accent">
            {typeof value === "number" ? `${value.toFixed(2)}` : `${value}`}
          </Text>
        </Text>
      );
    case "detailsCell":
      return (
        <View>
          <Button
            onPress={() => {
              // DetilsItemClick();
              setExpandedRow(param);

              setChild(
                child ? null : (
                  <DisplayDetilsItems
                    col={param}
                    schemas={subSchemas}
                    // setIsModalVisible={setIsModalVisible}
                  />
                )
              );
            }}
            style={{ backgroundColor: theme.accentHover }}
          >
            <FontAwesome5 name="sitemap" size={24} color={theme.body} />
          </Button>
        </View>
      );
    default:
      return (
        <Text
          key={param.dashboardFormSchemaParameterID}
          className="text-base text-text"
        >
          {param.parameterTitel}:{" "}
          <Text className="font-semibold text-accent">
            {typeof value === "number" ? `${value.toFixed(2)}` : `${value}`}
          </Text>
        </Text>
      );
  }
};
export default CardSchema;
