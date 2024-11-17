import React from "react";
import { Box, HStack, VStack } from "../components/ui";
import WebSidebar from "./WebSidebar";
import MainContent from "./main-content/MainContent";
import { ScrollView } from "react-native";
import HomeStatusBar from "./main-content/HomeStatusBar";
import HomeCarousel from "./main-content/HomeCarousel";
import HomeContent from "./main-content/HomeContent";
import Header from "../components/header/Header";

const Explorepage = ({ activeTab, setActiveTab }: any) => {
  return (
    <>
      <Box className={`w-full ${activeTab != "Profile" ? "flex" : "hidden"}`}>
        {/* top banner */}
        <Header
          title="Explore"
          subTitle="Home / Explore"
          backPress={() => console.log("Back pressed")}
          isBackIcon={false}
          isProfileImage={false}
        />
        {/* <Header /> */}
      </Box>

      {/* mobile */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="h-[1px] md:hidden mt-2"
      >
        <Box
          className={`${activeTab !== "Profile" ? "flex" : "hidden"} md:hidden`}
        >
          <VStack space="sm" style={{ flex: 1 }}>
            <HomeStatusBar />
            <HomeCarousel />
            <HomeContent />
          </VStack>
        </Box>
      </ScrollView>

      {/* web */}
      <HStack className="w-full hidden md:flex">
        <WebSidebar />
        {/* <ScrollView style={{ flex: 1 }}> */}
        <MainContent setActiveTab={setActiveTab} activeTab={activeTab} />
        {/* </ScrollView> */}
      </HStack>
    </>
  );
};

export default Explorepage;
