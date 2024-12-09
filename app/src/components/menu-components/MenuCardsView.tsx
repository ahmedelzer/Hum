import React, { useContext, useEffect } from "react";
import {
  Box,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
  Tooltip,
  TooltipContent,
  TooltipText,
  StarIcon,
} from "../../../components/ui";
import { ChevronRight, Heart, Scroll } from "lucide-react-native";
import { ScrollView } from "react-native";
import { ScreenHeight } from "@/src/components/shared";
import MenuCardView from "./MenuCardView";
import { LocalizationContext } from "../../../context/LocalizationContext";

const tabsData = [
  {
    name: "Picks for you",
    data: [
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/food1.jpg"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/food.jpg"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/food1.jpg"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/food.jpg"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/food1.jpg"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/food.jpg"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
    ],
  },
  {
    name: "Discount",
    data: [
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/image28.png"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/image28.png"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/image28.png"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
    ],
  },
  {
    name: "New king",
    data: [
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/food1.jpg"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
    ],
  },
  {
    name: "national parks",
    data: [
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/image16.png"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
    ],
  },
];

const tabs = [
  {
    title: "Picks for you",
  },
  {
    title: "Discount",
  },
  {
    title: "New king",
  },
];

const MenuCardsView = ({ menuCardItem, row, setRow }: any) => {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  const imageView = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "imagePath"
  );

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

  return (
    <Box className="md:px-0 -mt-4">
      <HomestayInfoTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setRow={setRow}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack>
          {tabsData.map((tab: any) => {
            if (tab.name.toLowerCase() === activeTab.title.toLowerCase()) {
              return tab.data.map((image: any, index: any) => {
                return (
                  <MenuCardView
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
              });
            }
            return null;
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
};

// const schemaActions =

const HomestayInfoTabs = ({
  tabs,
  activeTab,
  setActiveTab,
  row,
  setRow,
}: any) => {
  const { isRTL } = useContext(LocalizationContext);
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
  return (
    <Box className="border-b border-outline-50 md:border-b-0 md:border-transparent">
      <Box className="py-5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row-reverse",
          }}
          // contentContainerStyle={{
          //   flexDirection: isRTL ? "row-reverse" : "row",
          // }}
        >
          <HStack
            space="lg"
            className={`mx-0.5 ${
              isRTL ? "ml-auto" : "mr-auto"
            } xl:gap-5 2xl:gap-6`}
          >
            {tabs.map((tab: any) => {
              return (
                <Pressable
                  key={tab.title}
                  className={`my-0.5 py-1 ${
                    activeTab === tab ? "border-b-[3px]" : "border-b-0"
                  } !border-text hover:border-b-[3px] ${
                    activeTab === tab
                      ? "hover:border-accent"
                      : "hover:border-accent-hover"
                  } `}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    size="sm"
                    className={`${
                      activeTab === tab ? "text-accent" : "text-text"
                    } font-medium ${isRTL ? "text-right" : "text-left"}`}
                  >
                    {tab.title}
                  </Text>
                </Pressable>
              );
            })}
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
