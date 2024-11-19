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

const HomestayInformationFold = ({ row, setRow }: any) => {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  return (
    <Box className="pb-8 px-4 md:px-0 ">
      <HomestayInfoTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setRow={setRow}
      />
      <TabPanelData activeTab={activeTab} />
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space="lg" className="mx-0.5 xl:gap-5 2xl:gap-6">
            {tabs.map((tab: any) => {
              return (
                <Pressable
                  key={tab.title}
                  className={`my-0.5 py-1 ${
                    activeTab === tab ? "border-b-[3px]" : "border-b-0"
                  } border-outline-900 hover:border-b-[3px] ${
                    activeTab === tab
                      ? "hover:border-outline-900"
                      : "hover:border-outline-200"
                  } `}
                  onPress={() => setActiveTab(tab)}>
                  <Text
                    size="sm"
                    className={`${
                      activeTab === tab
                        ? "text-typography-900"
                        : "text-typography-600"
                    } font-medium`}>
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

const TabPanelData = ({ activeTab }: any) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        maxHeight: ScreenHeight - 435,
      }}>
      <HStack className="flex-row flex-wrap flex-shrink justify-between">
        {tabsData.map((tab: any) => {
          if (tab.name.toLowerCase() === activeTab.title.toLowerCase()) {
            return tab.data.map((image: any, index: any) => {
              return (
                <Box
                  key={`${tab.titel} + ${index}`}
                  style={{
                    maxWidth: "47%",
                  }}
                  className={`my-2 lg:my-0 ${
                    index === 0 ? "lg:ml-0" : "lg:ml-2"
                  } ${index === tab.data.length - 1 ? "lg:mr-0" : "lg:mr-2"}`}>
                  <Pressable>
                    {(props: any) => {
                      return (
                        <VStack className="w-full m-0">
                          <Box className="overflow-hidden rounded-md aspect-square ">
                            <Image
                              source={image.src}
                              className={`w-full h-72 ${
                                props.hovered
                                  ? "scale-[1.04] opacity-90"
                                  : "scale-100 opacity-100"
                              }`}
                              alt="Explore"
                            />
                          </Box>
                          {props.hovered && (
                            <Box className="absolute bg-[#181718] opacity-30 w-full h-full cursor-pointer" />
                          )}
                          <VStack className="mt-1">
                            <Text size="sm" className="font-semibold">
                              {image.title}
                            </Text>
                            <Text size="sm">{image.price}</Text>
                          </VStack>
                        </VStack>
                      );
                    }}
                  </Pressable>
                </Box>
              );
            });
          }
          return null;
        })}
      </HStack>
    </ScrollView>
  );
};
export default HomestayInformationFold;
