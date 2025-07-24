// components/CardSchema.jsx
import React, { useState } from "react";
import { View, Text } from "react-native";
import avoidColsTypes from "../form-container/avoidColsTypes.json";
import { Button } from "../../../components/ui";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../Theme";

const CardSchema = ({ schema, row }) => {
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
              <DisplayItem param={param} value={value} />
            );
          })}
      </View>
    </View>
  );
};
const DisplayItem = ({ param, value, setExpandedRow, setChild, child }) => {
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
        <Button
          // onPress={() => {
          //   // DetilsItemClick();
          //   setExpandedRow(row);

          //   setChild(
          //     child ? null : (
          //       <DisplayDetilsItems
          //         col={col}
          //         schemas={schemas}
          //         // setIsModalVisible={setIsModalVisible}
          //       />
          //     )
          //   );
          // }}
          style={{ backgroundColor: theme.accentHover }}
        >
          <FontAwesome5 name="sitemap" size={24} color={theme.body} />
        </Button>
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
