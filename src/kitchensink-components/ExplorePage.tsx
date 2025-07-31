import React from "react";
import { ScrollView, View } from "react-native";
import { Box, VStack } from "../../components/ui";
import { useDeviceInfo } from "../utils/component/useDeviceInfo";
import FaovertMenuItems from "./main-content/FaovertMenuItems";
import HomeCarousel from "./main-content/HomeCarousel";
import HomeCarouselWeb from "./main-content/HomeCarousel.web";
import AddressLocationCollapsible from "../utils/component/AddressLocationCollapsible";
import { theme } from "../Theme";
import SuggestCardContainer from "../components/suggest/SuggestCardContainer";
import RecommendedSchemaActions from "./../Schemas/MenuSchema/RecommendedSchemaActions.json";

const Explorepage = () => {
  const { os } = useDeviceInfo();
  return (
    <>
      <ScrollView>
        <Box>
          <VStack space="sm">
            {/* <AddressLocationCollapsible /> */}
            <View
              style={{
                // backgroundColor: theme.card,
                // padding: 16,
                marginTop: 0,
                borderBottomWidth: 1,
                borderBottomColor: theme.border,
              }}
            >
              <AddressLocationCollapsible />
            </View>
            {os === "web" && <HomeCarouselWeb />}
            {os !== "web" && <HomeCarousel />}
            <SuggestCardContainer
              suggestContainerType={0}
              schemaActions={RecommendedSchemaActions}
              shownNodeMenuItemIDs={[]}
            />
            <SuggestCardContainer
              suggestContainerType={1}
              schemaActions={RecommendedSchemaActions}
              shownNodeMenuItemIDs={[]}
            />

            {/* <HomeContent /> */}
            {/* <FaovertMenuItems /> */}
          </VStack>
        </Box>
      </ScrollView>
    </>
  );
};

export default Explorepage;
