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
  Card,
  ButtonIcon,
  ButtonText,
  Button,
  ArrowUpIcon,
  RemoveIcon,
} from "../../../components/ui";
import { ScrollView, View } from "react-native";
import { ScreenHeight } from "@/src/components/shared";
import {
  CheckIcon,
  CogIcon,
  HelpCircle,
  LocateIcon,
  PinIcon,
  User2Icon,
} from "lucide-react-native";

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

const MenuCardView = ({
  imageView,
  description,
  numberOfIndividuals,
  rate,
  likes,
  dislikes,
  orders,
  reviews,
  row,
  setRow,
  text,
  index,
}: any) => {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  console.log(text?.parameterField, "text?.parameterField");

  return (
    <Card
      key={`${index}-${text?.parameterField}`}
      variant="elevated"
      className="relative justify-center rounded-xl p-1 my-8">
      {imageView && (
        <Box className="absolute w-32 h-32">
          <Image
            size="full"
            resizeMode="cover"
            className="rounded-2xl"
            // blurRadius={0}
            source={require("../../../assets/display/food1.jpg")}
            alt="food"
          />
        </Box>
      )}
      <HStack>
        <Box className="flex-grow ml-[28%]">
          <VStack>
            {text && (
              <Text bold size="lg">
                {text?.parameterTitel}
              </Text>
            )}

            {description && (
              <Text numberOfLines={1} className="w-[50%]">
                {description?.parameterTitel}
              </Text>
            )}
            <HStack space="lg" className="items-center">
              {numberOfIndividuals && (
                <Button variant="link">
                  <ButtonText className="font-medium text-sm text-typography-900">
                    {/* {numberOfIndividuals.parameterTitel} */}
                    10
                  </ButtonText>
                  <Icon as={User2Icon} className="h-4 w-4 ml-1" color="green" />
                </Button>
              )}

              {reviews && (
                <Button variant="link">
                  <ButtonText className="font-medium text-sm text-typography-900">
                    {/* {reviews.parameterTitel} */}5
                  </ButtonText>
                  <Icon
                    as={StarIcon}
                    className="h-4 w-4 text-background-900 ml-1"
                  />
                </Button>
              )}

              {orders && (
                <Button variant="link">
                  <ButtonText className="font-medium text-sm text-typography-900">
                    8
                  </ButtonText>
                  <Icon as={CogIcon} color="purple" className="h-4 w-4 ml-1" />
                </Button>
              )}
            </HStack>
          </VStack>
        </Box>
      </HStack>
    </Card>
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

export default MenuCardView;
