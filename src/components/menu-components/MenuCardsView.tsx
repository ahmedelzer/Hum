import React, { useContext, useEffect } from "react";
import { I18nManager, ScrollView } from "react-native";
import { Box, HStack, Pressable, Text, VStack } from "../../../components/ui";
import { LocalizationContext } from "../../../context/LocalizationContext";
import MenuCardView from "./MenuCardView";
import {
  getAllMenuItems,
  updateCategory,
} from "../../reducers/MenuItemReducer";
import { useDispatch, useSelector } from "react-redux";
import { tabsData, tabs } from "./tabsData";

const MenuCardsView = ({ menuCardItem, row, setRow }: any) => {
  const products = useSelector((state) => state.menuItem.menuItem);
  const dispatch = useDispatch();
  const imageView = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "imagePath"
  );
  const activeTab = useSelector((state) => state.menuItem.currentCategory);

  const text = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) =>
      item?.parameterType === "text" &&
      !item.isIDField &&
      item.parameterField === "menuItemName"
  );

  const description = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) =>
      item?.parameterType === "text" &&
      item.parameterField === "menuItemDescription"
  );

  const numberOfIndividuals = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "numberOfIndividuals"
  );

  const rate = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "rate"
  );

  const likes = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "likes"
  );

  const dislikes = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "dislikes"
  );

  const orders = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "orders"
  );

  const reviews = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "reviews"
  );

  // console.log(
  //   menuCardItem?.dashboardFormSchemaParameters,
  //   "menuCardItem?.dashboardFormSchemaParameters"
  // );
  const foods = [
    {
      id: "1",
      name: "Meat Pizza",
      ingredients: "Mixed Pizza",
      price: "8.30",
      image: require("../../../assets/display/food1.jpg"),
    },
    {
      id: "2",
      name: "Cheese Pizza",
      ingredients: "Cheese Pizza",
      price: "7.10",
      image: require("../../../assets/display/food1.jpg"),
    },
    {
      id: "3",
      name: "Chicken Burger",
      ingredients: "Fried Chicken",
      price: "5.10",
      image: require("../../../assets/display/food1.jpg"),
    },
    {
      id: "4",
      name: "Sushi Makizushi",
      ingredients: "Salmon Meat",
      price: "9.55",
      image: require("../../../assets/display/food.jpg"),
    },
  ];
  useEffect(() => {
    // if (products.length > 0) return;
    //! set here the conditions of is have new products and online users
    const data = tabsData.filter((tab) => tab.categoryId === activeTab.id);

    const fetchProducts = () => {
      dispatch(getAllMenuItems(data));
    };
    fetchProducts();
  }, []);
  // console.log("====================================");
  // console.log(products);
  // console.log("====================================");
  return (
    <Box className="md:px-0 -mt-4" style={{ marginBottom: 110 }}>
      <HomestayInfoTabs tabs={tabs} setRow={setRow} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack>
          {products?.map((image: any, index: any) => {
            return (
              <MenuCardView
                key={index}
                item={image}
                imageView={imageView}
                text={"text"}
                description={"description"}
                numberOfIndividuals={numberOfIndividuals}
                rate={rate}
                likes={likes}
                dislikes={dislikes}
                orders={orders}
                reviews={reviews}
                // index={index}
              />
            );
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
};

// const schemaActions =

const HomestayInfoTabs = ({ tabs, row, setRow }: any) => {
  const { isRTL } = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.menuItem.currentCategory);
  // const schemaActionsParams = data?.map((item: any) =>
  //   item?.dashboardFormSchemaActionQueryParams.map(
  //     (param: any) => param.dashboardFormParameterField
  //   )
  // );

  // useEffect(() => {
  //   if (schemaActionsParams) {
  //     setRow((prevRow: any) => ({ ...prevRow, schemaActionsParams }));
  //   }
  // }, [row]);

  // console.log(schemaActionsParams, "schemaActionsParams");

  // const viewConstatns = {
  //   pageIndex: 1,
  //   pageSize: 3,
  // };

  // {
  //   pageIndex: 1,
  //   pageSize: 3,
  //   keyword : 'string',
  //   filter:'asdawd'
  // }
  // useEffect(() => {
  //   // if (products.length > 0) return;
  //   //! set here the conditions of is have new products and online users
  // }, []);
  return (
    <Box className="border-b border-outline-50 md:border-b-0 md:border-transparent">
      <Box className="py-5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: I18nManager.isRTL ? "row-reverse" : "row", // Adjust layout for RTL
          }}
        >
          <HStack
            space="lg"
            className={`mx-0.5 xl:gap-5 2xl:gap-6 flex ${
              I18nManager.isRTL ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {tabs.map((tab: any) => (
              <Pressable
                key={tab.title}
                className={`my-0.5 py-1 ${
                  activeTab === tab ? "border-b-[3px]" : "border-b-0"
                } !border-text hover:border-b-[3px] ${
                  activeTab === tab
                    ? "hover:border-accent"
                    : "hover:border-accent-hover"
                }`}
                onPress={() => {
                  const data = tabsData.filter(
                    (data) => data.categoryId === tab.id
                  );
                  const fetchProducts = () => {
                    dispatch(getAllMenuItems(data));
                    dispatch(updateCategory(tab));
                  };
                  fetchProducts();
                }}
              >
                <Text
                  size="sm"
                  className={`${
                    activeTab === tab ? "text-accent" : "text-text"
                  } font-medium ${
                    I18nManager.isRTL ? "text-right" : "text-left"
                  }`} // Dynamic alignment
                >
                  {tab.title}
                </Text>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default MenuCardsView;

// <Box
//   key={`${tab.titel} + ${index}`}
//   style={{
//     maxWidth: "47%",
//   }}
//   className={`my-2 lg:my-0 ${
//     index === 0 ? "lg:ml-0" : "lg:ml-2"
//   } ${index === tab.data.length - 1 ? "lg:mr-0" : "lg:mr-2"}`}>
//   <Pressable>
//     {(props: any) => {
//       return (
//         <VStack className="w-full m-0">
//           <Box className="overflow-hidden rounded-md aspect-square ">
//             {imageView && (
//               <Image
//                 source={image.src}
//                 className={`w-full h-72 ${
//                   props.hovered
//                     ? "scale-[1.04] opacity-90"
//                     : "scale-100 opacity-100"
//                 }`}
//                 alt="Explore"
//               />
//             )}
//           </Box>
//           {props.hovered && (
//             <Box className="absolute bg-[#181718] opacity-30 w-full h-full cursor-pointer" />
//           )}
//           <VStack className="mt-1">
//             {text && (
//               <Text size="sm" className="font-semibold">
//                 {image.title}
//               </Text>
//             )}
//             {description && (
//               <Text size="sm">
//                 {description.parameterTitel}
//               </Text>
//             )}
//           </VStack>
//         </VStack>
//       );
//     }}
//   </Pressable>
// </Box>
