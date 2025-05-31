import React from "react";
import { ScrollView } from "react-native";
import { Box, VStack } from "../../components/ui";
import { useDeviceInfo } from "../utils/component/useDeviceInfo";
import FaovertMenuItems from "./main-content/FaovertMenuItems";
import HomeCarousel from "./main-content/HomeCarousel";



const Explorepage = () => {
  const { os } = useDeviceInfo();
  return (
    <>
      <ScrollView>
        <Box>
          <VStack space="sm">
            {/* <AddressLocationCollapsible /> */}
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
