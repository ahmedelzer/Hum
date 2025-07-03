import { View, Text } from "react-native";
import React, { useState } from "react";
import { CollapsibleSection } from "./Collapsible";
import AddressLocation from "../../components/addressLocation/AddressLocation";
import { TabButtons } from "../../components/menu-components/TabButtons";
import { theme } from "../../Theme";
import { useSelector } from "react-redux";
import NearestBranches from "../../components/addressLocation/NearestBranches";

export default function AddressLocationCollapsible() {
  const localization = useSelector((state) => state.localization.localization);

  const selectedTab = useSelector((state) => state.location.selectedTab);
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );
  console.log(selectedTab);

  return (
    <View className=" w-full mb-2 px-3">
      <View
        className=" w-full p-1 rounded-xl shadow-sm"
        style={{ backgroundColor: theme.dark_card }}
      >
        <CollapsibleSection
          title={localization.Hum_screens.home.MarketPlace}
          icon={null}
          setheader={true}
          iconColor={theme.body}
          textColor={theme.body}
        >
          <TabButtons loading={false} rows={["Pickup", "Address"]} />
          //!schema or localization
          {selectedTab == 1 ? (
            <View className="flex-row items-center justify-center overflow-auto mb-3">
              <AddressLocation />
            </View>
          ) : null}
          <NearestBranches />
        </CollapsibleSection>
      </View>
    </View>
  );
}
