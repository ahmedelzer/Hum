import { useFetchSchemaActions } from "@/src/services/react-query-hooks/FetchSchemaActions";
import React, { useState } from "react";
import { View } from "react-native";
import { HStack } from "../../../components/ui";
import SearchBarFilter from "../filters/SearchBarFilter";
import Searchbar from "../search-bar/Searchbar";
import AddLocation from "./AddLocation";
import MenuCardsView from "./MenuCardsView";

const MenuView = ({ schemas }: any) => {
  const { data, isLoading, isSuccess } = useFetchSchemaActions({
    dashboardSchemaId: "8D8F94A8-78A1-409F-B7CC-AE0E4F277D66",
  });

  const [row, setRow] = useState({});

  const searchBarSchema = schemas?.find(
    (schema: any) => schema.schemaType === "searchBar"
  );
  const searchBarFilter = schemas?.find(
    (schema: any) => schema.schemaType === "filters"
  );

  const menuCardItem = schemas?.find(
    (schema: any) => schema.schemaType === "menuItemCards"
  );
  return (
    <View className="flex-1 gap-y-4 mx-4">
      <View className="flex-row">
        <AddLocation />
      </View>
      <HStack space="2xl" className="items-center">
        <View style={{ flex: 1 }}>
          {/* {searchBarSchema && ( */}
          <Searchbar schema={searchBarSchema} setRow={setRow} row={row} />
          {/* )} */}
        </View>
        <View style={{ flex: 0 }}>
          {/* {searchBarFilter && ( */}
          <SearchBarFilter schema={searchBarFilter} setRow={setRow} row={row} />
          {/* )} */}
        </View>
      </HStack>
      {/* <HomeCarousel menuCardItem={menuCardItem} row={row} setRow={setRow} /> */}
      {/* {menuCardItem && ( */}
      <MenuCardsView menuCardItem={menuCardItem} row={row} setRow={setRow} />
      {/* )} */}
    </View>
  );
};

export default MenuView;

/* <FlatList
        style={{
          height: "50%",
        }}
        data={pData ? pData.pages.flatMap((page: any) => page) : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HStack space="4xl">
            <Text className="p-16 ">{item.title}</Text>
          </HStack>
        )}
        onEndReached={loadMoreData}
        onEndReachedThreshold={1}
        // ListFooterComponent={
        //   isFetching ? <ActivityIndicator size="small" color="#0000ff" /> : null
        // }
      /> */
// const loadMoreData = () => {
//   if (hasNextPage && !pLoading) {
//     fetchNextPage();
//   }
// };
// const schemaActionsParams: any = [];
// useEffect(() => {
//   if (data) {
//     const schemaParams = data?.flatMap((item: any) =>
//       item?.dashboardFormSchemaActionQueryParams.map(
//         (param: any) => param.dashboardFormParameterField
//       )
//     );
//     console.log(schemaParams, "schemaParams");
//     const mergedParams = [...schemaParams, row];
//     schemaActionsParams.push(mergedParams);
//     console.log(mergedParams, "mergedParams");
//   }
// }, [data, row]);
// console.log(schemaActionsParams, "schemaActionsParams");
// if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
// if (error) return <Text>Error: {error.message}</Text>;
// const value = "searchValue"; // Replace with your search value
// const debouncedSearchResults = "debouncedValue"; // Replace with your debounced search value
// const pageSize = 1; // Adjust the page size as needed
// console.log(schemas, " schemas from menu view");
// const {
//   data: pData,
//   error,
//   isLoading: pLoading,
//   isFetching,
//   fetchNextPage,
//   hasNextPage,
// } = usePagination({
//   value,
//   debouncedSearchResults,
//   pageSize,
// });
// console.log(pData, "pData");
// const { data: agendaData } = useJson();
