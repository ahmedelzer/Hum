import React from "react";
import { ScrollView } from "react-native";
import { Box, VStack } from "../../components/ui";
import { useDeviceInfo } from "../utils/useDeviceInfo";
import FaovertMenuItems from "./main-content/FaovertMenuItems";
import HomeCarousel from "./main-content/HomeCarousel";
import HomeCarouselWeb from "./main-content/HomeCarousel.web";
import HomeContent from "./main-content/HomeContent";

const Explorepage = () => {
  const { os } = useDeviceInfo();
  return (
    <>
      <ScrollView>
        <Box>
          <VStack space="sm">
            {os === "web" && <HomeCarouselWeb />}
            {os !== "web" && <HomeCarousel />}
            {/* <HomeContent /> */}
            <FaovertMenuItems />
          </VStack>
        </Box>
      </ScrollView>
    </>
  );
};

export default Explorepage;
