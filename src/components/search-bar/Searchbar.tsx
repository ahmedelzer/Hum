import React, { useEffect, useState } from "react";
import {
  Box,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
} from "@/components/ui";
import localization from "../../utils/localization.json";
import { SearchCodeIcon } from "lucide-react-native";
import { Text } from "react-native";

const Searchbar = ({ schema, row, setRow }: any) => {
  const fieldId = schema?.idField;
  const searchFeild = schema?.dashboardFormSchemaParameters?.find(
    (item: any) => !item?.isIDField && item?.parameterType === "text"
  );
  const fieldName = searchFeild?.parameterField;

  return (
    <Box className="w-full">
      <Input variant="rounded" size="sm" className="w-full h-10">
        <InputField
          onBlur={(e: any) => setRow({ ...row, [fieldName]: e.target.value })}
          defaultValue={row[fieldName]}
          placeholder={
            localization?.inputs.base.placeholder +
            " " +
            searchFeild?.parameterTitel
          }
        />
        <InputSlot className=" rounded-full h-6 w-6 m-1.5 bg">
          <Icon as={SearchCodeIcon} size="lg" color="#111" />
        </InputSlot>
      </Input>
    </Box>
  );
};

export default Searchbar;
