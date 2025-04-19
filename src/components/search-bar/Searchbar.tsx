import { Box, Input, InputField, InputSlot } from "@/components/ui";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { getAllMenuItems } from "../../reducers/MenuItemReducer";
import { tabsData } from "../menu-components/tabsData";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import searchBarSchema from "../../Schemas/MenuSchema/searchBarSchema.json";
import { Icon, InputIcon, SearchIcon } from "../../../components/ui";
//!localization
const Searchbar = ({ schema, row, setRow }) => {
  const { localization } = useContext(LocalizationContext);
  const firstPram = searchBarSchema.dashboardFormSchemaParameters[0];
  const handleSearch = (value) => {
    setRow({ ...row, [firstPram.parameterField]: value });
  };

  return (
    <Box className="w-full">
      {searchBarSchema && (
        <Input variant="rounded" size="sm" className="w-full h-10">
          <InputField
            value={row[firstPram.parameterField]}
            onChangeText={handleSearch}
            placeholder={localization.Hum_screens.menu.search.placeholder}
          />
          <InputSlot className="rounded-full h-6 w-6 m-1.5 bg">
            {/* <InputIcon> */}
            <FontAwesome name="search" size={24} color="black" />
            {/* </InputIcon> */}
          </InputSlot>
        </Input>
      )}
    </Box>
  );
};

export default Searchbar;
