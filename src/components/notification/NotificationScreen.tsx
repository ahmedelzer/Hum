import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  VStack,
  HStack,
  Text,
  Heading,
  Icon,
  Divider,
} from "../../../components/ui";
import { Bell } from "lucide-react-native";
import GoBackHeader from "../header/GoBackHeader";
import { CollapsibleSection } from "../../utils/Collapsible";
import { Feather } from "@expo/vector-icons";

const notifications = [
  {
    id: 1,
    title: "Order Shipped",
    message: "Your order #1234 has been shipped.",
  },
  {
    id: 2,
    title: "New Discount!",
    message: "Get 20% off on your next purchase!",
  },
  {
    id: 3,
    title: "Cart Reminder",
    message: "You have items left in your cart!",
  },
];

export default function NotificationScreen() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <ScrollView style={{ flex: 1, height: "100%" }} className="bg-body">
      {/* Header */}
      <GoBackHeader subTitle={"show Notifications"} title={"Notifications"} />
      <VStack className="flex-1 p-4">
        {/* <Heading className="mb-3">Notifications</Heading> */}
        <CollapsibleSection
          title="Recent Notifications"
          icon={() => <Feather name="bell" size={24} className="text-text" />}
          expandedSection={expandedSection}
          toggleSection={toggleSection}
        >
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <View key={item.id} className="mb-2">
                <HStack className="justify-between items-center p-3 bg-card rounded-lg">
                  <HStack space="md">
                    <Icon
                      as={() => (
                        <Feather name="bell" size={24} className="text-text" />
                      )}
                      className="text-primary-custom"
                    />
                    <VStack>
                      <Text className="font-bold text-text">{item.title}</Text>
                      <Text className="text-primary-custom">
                        {item.message}
                      </Text>
                    </VStack>
                  </HStack>
                </HStack>
                <Divider />
              </View>
            ))
          ) : (
            <Text className="text-center text-typography-500 mt-4">
              No new notifications
            </Text>
          )}
        </CollapsibleSection>
      </VStack>
    </ScrollView>
  );
}
