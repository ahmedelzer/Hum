import React from "react";
import { Box, FavouriteIcon, HStack, VStack } from "../../components/ui";
import WebSidebar from "./WebSidebar";
import MainContent from "./main-content/MainContent";
import { ScrollView, Text } from "react-native";
import HomeStatusBar from "./main-content/HomeStatusBar";
import HomeCarousel from "./main-content/HomeCarousel";
import HomeContent from "./main-content/HomeContent";
import Header from "../components/header/Header";
import FaovertMenuItems from "./main-content/FaovertMenuItems";

const Explorepage = ({ activeTab, setActiveTab }: any) => {
  return (
    <>
      {/* <Box className={`w-full ${activeTab != "Profile" ? "flex" : "hidden"}`}> */}
      {/* top banner */}
      {/* <Header
          title="Explore"
          subTitle="Home / Explore"
          backPress={() => console.log("Back pressed")}
          isBackIcon={false}
          isProfileImage={false}
        /> */}
      {/* <Header /> */}
      {/* </Box> */}

      {/* mobile */}
      <ScrollView>
        <Box>
          <VStack space="sm">
            {/* <HomeStatusBar /> */}
            {/* <WebSidebar /> */}
            <HomeCarousel />
            <HomeContent />
            <FaovertMenuItems />
          </VStack>
        </Box>
      </ScrollView>
      {/* web */}
    </>
  );
};

export default Explorepage;
