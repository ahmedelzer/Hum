import React from "react";
import { HStack, Text } from "../../../components/ui";

const formatValue = (value, type) => {
  if (!value) return "";
  switch (type) {
    case "date":
      return new Date(value).toLocaleDateString(); // Customize as needed
    case "number":
      return Number(value).toLocaleString();
    case "text":
    default:
      return value.toString();
  }
};

const GridRow = ({ row, columns }) => (
  <HStack className="border-b border-gray-200 py-2 px-2">
    {columns.map((col) => (
      <Text key={col.name} className="flex-1 text-xs">
        {formatValue(row[col.name], col.type)}
      </Text>
    ))}
  </HStack>
);

export default GridRow;
