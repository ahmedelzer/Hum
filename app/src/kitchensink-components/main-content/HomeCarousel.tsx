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
import { ScrollView } from "react-native";
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

  // console.log("isContentAtRight");
  return (
    <Box className="w-full">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        scrollEventThrottle={50}
        contentContainerStyle={{
          columnGap: 16,
          marginTop: -110,
          // backgroundColor: "red",
        }}
        onScroll={(event) => {
          if (isCloseToRight(event)) {
            setIsContentAtRight(false);
          } else {
            setIsContentAtRight(true);
          }
          setScrollPosition(event.nativeEvent.contentOffset.x);
        }}>
        {data.map((image, index) => {
          return (
            <Box
              key={index}
              className=" justify-center items-center relative -mb-4">
              {imageView && (
                <Image
                  source={image.src}
                  alt={"place" + index}
                  // @ts-ignore
                  className="w-auto h-[60%] aspect-square rounded-xl"
                  resizeMode="cover"
                />
              )}
              <Card
                variant="elevated"
                className="absolute bottom-9 w-[90%] justify-center p-4 rounded-3xl shadow-xl">
                <Pressable
                  onPress={() => setLikes(!likes)}
                  className="absolute top-3 right-4 h-6 w-6  justify-center items-center">
                  <AnimatePresence>
                    <Motion.View
                      key={likes ? "like" : "dislike"}
                      initial={{
                        scale: 1.3,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      exit={{
                        scale: 0.9,
                      }}
                      transition={{
                        type: "spring",
                        mass: 0.9,
                        damping: 9,
                        stiffness: 300,
                      }}
                      style={{
                        position: "absolute",
                      }}>
                      <Icon
                        as={Heart}
                        size="xl"
                        className={`${
                          likes
                            ? "fill-red-500 stroke-red-500"
                            : "fill-gray-500 stroke-white"
                        }`}
                      />
                    </Motion.View>
                  </AnimatePresence>
                </Pressable>

                <VStack space="sm">
                  {text && (
                    <Text bold size="sm">
                      {text?.parameterTitel}
                    </Text>
                  )}
                  {description && (
                    <Text size="sm" className="w-[50%]">
                      {description?.parameterTitel}
                    </Text>
                  )}
                  {rate && (
                    <HStack space="sm" className="items-center">
                      <HStack space="xs" className="items-center">
                        {[...Array(4)].map((_, i) => (
                          <Icon
                            key={i}
                            as={StarIcon}
                            size="sm"
                            color="orange"
                          />
                        ))}
                      </HStack>
                      <Text size="sm" className="ml-2">
                        4
                      </Text>

                      {numberOfIndividuals && (
                        <>
                          <Text size="sm" className="ml-2">
                            8
                          </Text>
                          <Icon as={UserCheck} size="sm" color="green" />
                        </>
                      )}
                    </HStack>
                  )}
                  <HStack space="lg" className="items-center">
                    {orders && (
                      <Button variant="link">
                        <ButtonText className="font-medium text-sm text-typography-900">
                          8
                        </ButtonText>
                        <Icon
                          color="gray"
                          as={BoxIcon}
                          className="h-4 w-4 ml-1"
                        />
                      </Button>
                    )}
                    {reviews && (
                      <Button variant="link">
                        <ButtonText className="font-medium text-sm text-typography-900">
                          18
                        </ButtonText>
                        <Icon
                          as={AxeIcon}
                          className="h-4 w-4  ml-1"
                          color="#bee5d2"
                        />
                      </Button>
                    )}
                    <Button variant="link">
                      <ButtonText className="font-medium text-sm text-typography-900">
                        Locate
                      </ButtonText>
                      <Icon
                        as={LocateIcon}
                        className="h-4 w-4  ml-1"
                        color="orange"
                      />
                    </Button>
                  </HStack>
                </VStack>
              </Card>
            </Box>
          );
        })}
      </ScrollView>
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
        onPress={handleScrollLeft}>
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
        disabled={disabled}>
        <Icon as={ChevronRight} size="lg" color={"#535252"} />
      </Pressable>
    </Center>
  );
};

export default HomeCarousel;
