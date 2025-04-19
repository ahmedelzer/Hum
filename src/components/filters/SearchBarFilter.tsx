import { Button, Menu } from "@/components/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
const SearchBarFilter = ({ schema, setRow, row }: any) => {
  const navigation = useNavigation();
  // console.log(schema, "schema from search bar filter");
  const searchFilter = schema?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.isIDField && item?.parameterType === "collapse"
  );
  return (
    <Menu
      className="mx-4 self-center rounded-xl"
      placement="top"
      offset={5}
      onclick
      disabledKeys={["Settings"]}
      useRNModal={true}
      trigger={({ ...triggerProps }) => {
        return (
          <Button
            {...triggerProps}
            size="sm"
            className="rounded-full !bg-text"
            onPress={() => {
              // Navigate to "MenuFilter" and pass the params
              navigation.navigate("MenuFilter");
            }}
          >
            <MaterialIcons
              name="filter-list"
              size={24}
              className="!text-body"
            />
          </Button>
        );
      }}
    />
  );
};

export default SearchBarFilter;
