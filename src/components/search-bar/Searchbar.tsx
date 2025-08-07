import { Box, Input, InputField, InputSlot } from "@/components/ui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { useSelector } from "react-redux";
import searchBarSchema from "../../Schemas/MenuSchema/searchBarSchema.json";

const Searchbar = ({ schema, row, setRow }) => {
  const localization = useSelector((state) => state.localization.localization);
  const firstPram = searchBarSchema.dashboardFormSchemaParameters[0];
  const handleSearch = (value) => {
    setRow({ ...row, [firstPram.parameterField]: value });
  };

  return (
    <Box className="w-full">
      {searchBarSchema && (
        <Input
          variant="rounded"
          size="sm"
          className="w-full h-10 border-border bg-surface"
        >
          <InputField
            value={row[firstPram.parameterField]}
            onChangeText={handleSearch}
            placeholder={localization.Hum_screens.menu.search.placeholder}
          />
          <InputSlot className="rounded-full h-6 w-6 m-1.5 bg">
            {/* <InputIcon> */}
            <FontAwesome name="search" size={24} className="text-text" />
            {/* </InputIcon> */}
          </InputSlot>
        </Input>
      )}
    </Box>
  );
};

export default Searchbar;
