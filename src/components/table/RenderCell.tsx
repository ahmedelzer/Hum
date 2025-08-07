import React, { useState } from "react";
import { Image, Text } from "react-native";
import DisplayDetilsItems from "../../kitchensink-components/profile/DisplayDetilsItems";
import { Button } from "../../../components/ui";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../../Theme";
import { baseURLWithoutApi, publicImageURL } from "../../../request";

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
    case "image":
    case "publicImage":
      // const isBlob = typeof value === "string" && value.startsWith("blob:");
      // const [imageUrl, setImageUrl] = useState("");
      // if (col.type == "image") {
      //   setImageUrl(isBlob ? value : `${baseURLWithoutApi}/${value}`);
      // } else if (col.type == "publicImage") {
      //   setImageUrl(isBlob ? value : `${publicImageURL}/${value}`);
      // }
      console.log(col, row, "publicImage");

      return value ? (
        <Image
          source={{ uri: value }}
          style={{ width: 40, height: 40, borderRadius: 4 }}
          resizeMode="cover"
        />
      ) : (
        <Text style={{ fontSize: 12 }}>No Image</Text>
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
