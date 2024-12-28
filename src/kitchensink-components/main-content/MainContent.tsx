import React from "react";
import { Box } from "../../../components/ui";
import HomestayInformationFold from "./HomestayInformationFold";
import MainContentHeader from "./MainContentHeader";
import NewThisWeekFold from "./HomeStatusBar";

const MainContent = ({
  modalVisible,
  setModalVisible,
  setActiveTab,
  activeTab,
}: any) => {
  return (
    <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
      <NewThisWeekFold />
    </Box>
  );
};
export default MainContent;
