import React, { useState } from "react";
import { Text } from "react-native";
import DisplayDetilsItems from "../../kitchensink-components/profile/DisplayDetilsItems";
import { Button } from "../../../components/ui";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../Theme";

export const RenderCell = ({
  value,
  col,
  row,
  setChild,
  setExpandedRow,
  schemas,
  child,
}) => {
  switch (col.type) {
    case "date":
      return (
        <Text style={{ fontSize: 12 }}>
          {value ? new Date(value).toLocaleDateString() : ""}
        </Text>
      );

    case "number":
      return (
        <Text style={{ fontSize: 12 }}>
          {value !== null && value !== undefined
            ? Number(value).toLocaleString()
            : ""}
        </Text>
      );

    case "detailsCell":
      return (
        <Button
          onPress={() => {
            // DetilsItemClick();
            setExpandedRow(row);

            setChild(
              child ? null : (
                <DisplayDetilsItems
                  col={col}
                  schemas={schemas}
                  // setIsModalVisible={setIsModalVisible}
                />
              )
            );
          }}
          style={{ backgroundColor: theme.accentHover }}
        >
          <FontAwesome5 name="sitemap" size={24} color={theme.body} />
        </Button>
      );

    case "text":
    default:
      return (
        <Text style={{ fontSize: 12 }}>
          {value !== null && value !== undefined ? value.toString() : ""}
        </Text>
      );
  }
};
