import { Box, Input, InputField, InputSlot } from "@/components/ui";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { getAllMenuItems } from "../../reducers/MenuItemReducer";
import { tabsData } from "../menu-components/tabsData";
//!localization
const Searchbar = ({ schema, row, setRow }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const activeTab = useSelector((state) => state.menuItem.currentCategory);
  const { localization } = useContext(LocalizationContext);

  const dispatch = useDispatch();

  const filterItems = (tabsData, searchTerm) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return tabsData.filter((item) => {
      const keywords = item.keywords?.join(" ") || "";
      const name = item.name || "";
      const description = item.description || "";

      const searchString = `${keywords} ${name} ${description}`.toLowerCase();

      return searchString.includes(lowercasedSearchTerm);
    });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const productsByActiveTab = tabsData.filter(
      (data) => data.categoryId === activeTab.id
    );
    const filteredResults = filterItems(productsByActiveTab, value);

    console.log("Filtered Results:", filteredResults);

    // Dispatch the filtered results
    dispatch(getAllMenuItems(filteredResults));

    // Optionally update row state
    if (setRow) {
      setRow(filteredResults);
    }
  };

  return (
    <Box className="w-full">
      <Input variant="rounded" size="sm" className="w-full h-10">
        <InputField
          value={searchTerm}
          onChangeText={handleSearch}
          placeholder={localization.Hum_screens.menu.search.placeholder}
        />
        <InputSlot className="rounded-full h-6 w-6 m-1.5 bg">
          {/* <Icon as={SearchCodeIcon} size="lg" color="#111" /> */}
        </InputSlot>
      </Input>
    </Box>
  );
};

export default Searchbar;
