import React, { useRef, useState, useContext } from "react";
import {
  Box,
  HStack,
  Center,
  Image,
  Icon,
  Pressable,
  ImageBackground,
  Card,
  VStack,
  Text,
  ButtonText,
  Button,
} from "../../../components/ui";
import { Dimensions, ScrollView, View } from "react-native";
import {
  AxeIcon,
  BoxIcon,
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  Heart,
  LocateIcon,
  PinIcon,
  StarIcon,
  UserCheck,
} from "lucide-react-native";
import { AnimatePresence, Motion } from "@legendapp/motion";
import Carousel from "react-native-snap-carousel";
import { moderateScale, scale } from "react-native-size-matters";
import { CarouselBox } from "../../components/cards/CarouselBox";

const data = [
  {
    src: require("../../../assets/display/food.jpg"),
  },
  {
    src: require("../../../assets/display/food.jpg"),
  },

  {
    src: require("../../../assets/display/food.jpg"),
  },
  // {
  //   src: require("../../../assets/display/image5.png"),
  // },
  {
    src: require("../../../assets/display/food.jpg"),
  },
  // {
  //   src: require("../../../assets/display/image7.png"),
  // },
  {
    src: require("../../../assets/display/food.jpg"),
  },
];

const HomeCarousel = ({ menuCardItem, row }: any) => {
  const [likes, setLikes] = useState(false);
  const scrollViewRef = useRef(null);
  const scrollAmount = 400;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isContentAtRight, setIsContentAtRight] = useState(true);

  const handleScrollLeft = () => {
    const newScrollPosition = scrollPosition - scrollAmount;
    if (scrollViewRef.current) {
      // @ts-ignore
      scrollViewRef?.current?.scrollTo({
        x: newScrollPosition,
        animated: true,
      });
      setScrollPosition(newScrollPosition);
    }
  };

  const handleScrollRight = () => {
    const newScrollPosition = scrollPosition + scrollAmount;
    if (scrollViewRef.current)
      // @ts-ignore
      scrollViewRef?.current?.scrollTo({
        x: newScrollPosition,
        animated: true,
      });
    setScrollPosition(newScrollPosition);
  };

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

  const likesView = menuCardItem?.dashboardFormSchemaParameters?.find(
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

  const checkContentAtLeft = () => {
    if (scrollPosition > 0) {
      return true;
    }
    return false;
  };

  const isCloseToRight = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isScrollAtEnd =
      contentOffset.x + layoutMeasurement.width >= contentSize.width;
    if (isScrollAtEnd) {
      return true;
    }
    return false;
  };
  var { width, height } = Dimensions.get("window");
  // Reusable Carousel Box Component

  // console.log("isContentAtRight");
  return (
    <Box className="w-full">
      <CarouselBox
        image={data[0].src}
        key={data[0].src}
        actions={{ likes, setLikes }}
        title="Delicious Meal"
        description="A delightful culinary experience."
      />
      {/* <Carousel
        data={data}
        renderItem={({ item }) => (
          <CarouselBox
            image={item.src}
            key={item.src}
            title="Delicious Meal"
            description="A delightful culinary experience."
          />
        )}
        sliderWidth={width}
        itemWidth={width * 0.8}
        inactiveSlideOpacity={0.8}
      /> */}

      <ScrollLeft
        handleScrollLeft={handleScrollLeft}
        disabled={!checkContentAtLeft()}
      />
      <ScrollRight
        handleScrollRight={handleScrollRight}
        disabled={!isContentAtRight}
      />
    </Box>
  );
};

const ScrollLeft = ({ handleScrollLeft, disabled }: any) => {
  return (
    <Center className="absolute left-0 h-full hidden md:flex">
      <Pressable
        className={`p-1 ml-3 rounded-full border-outline-300 border bg-background-50 md:-ml-[16px] hover:bg-background-100 ${
          disabled
            ? "data-[disabled=true]:opacity-0"
            : "data-[disabled=true]:opacity-100"
        }`}
        disabled={disabled}
        onPress={handleScrollLeft}
      >
        <Icon as={ChevronLeft} size="lg" color={"#535252"} />
      </Pressable>
    </Center>
  );
};

const ScrollRight = ({ handleScrollRight, disabled }: any) => {
  return (
    <Center className="absolute right-0 h-full hidden md:flex">
      <Pressable
        className={`p-1 ml-3 rounded-full border-outline-300 border bg-background-50 md:-mr-4 hover:bg-background-100 ${
          disabled
            ? "data-[disabled=true]:opacity-0"
            : "data-[disabled=true]:opacity-100"
        }`}
        onPress={handleScrollRight}
        disabled={disabled}
      >
        <Icon as={ChevronRight} size="lg" color={"#535252"} />
      </Pressable>
    </Center>
  );
};

export default HomeCarousel;
