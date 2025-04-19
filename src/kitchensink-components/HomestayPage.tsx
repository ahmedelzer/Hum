import { Box } from "@/components/ui/box";
import React, { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import Explorepage from "./ExplorePage";

const HomePage = () => {
  useEffect(() => {
    if (Platform.OS === "web") {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    }
  }, []);
  return (
    <>
      <Box className="flex-1">
        <StatusBar />
        <Box className="flex-1">
          <Explorepage />
        </Box>
      </Box>
    </>
  );
};
export default HomePage;
