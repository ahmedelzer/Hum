import { View, Text } from "react-native";
import React, { useState } from "react";
import { CollapsibleSection } from "./Collapsible";
import AddressLocation from "../../components/addressLocation/AddressLocation";
import { TabButtons } from "../../components/menu-components/TabButtons";
import { theme } from "../../Theme";
import { useSelector } from "react-redux";
import NearestBranches from "../../components/addressLocation/NearestBranches";

export default function AddressLocationCollapsible() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
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
          title="Market Places"
          icon={null}
          expandedSection={expandedSection}
          toggleSection={toggleSection}
          setheader={true}
          iconColor={theme.body}
          textColor={theme.body}
        >
          <TabButtons loading={false} rows={["Pickup", "Address"]} />
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
