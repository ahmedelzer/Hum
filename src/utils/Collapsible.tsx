import { useNavigation } from "@react-navigation/native";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import React from "react";
import { HStack, Icon, Pressable, Text, VStack } from "../../components/ui";

export const CollapsibleSection = ({
  title,
  icon: IconComponent,
  children,
  expandedSection,
  toggleSection,
}) => {
  const isOpen = expandedSection === title;
  return (
    <VStack space="lg">
      <Pressable onPress={() => toggleSection(title)}>
        <HStack className="justify-between items-center">
          <HStack space="md">
            <Icon as={IconComponent} />
            <Text>{title}</Text>
          </HStack>
          <Icon as={isOpen ? ChevronDown : ChevronRight} />
        </HStack>
      </Pressable>
      {isOpen && <VStack className="p-2 bg-card rounded-lg">{children}</VStack>}
    </VStack>
  );
};
export const CollapsibleNavigation = ({
  title,
  icon: IconComponent,
  screenName,
}) => {
  // Inside MobileProfilePage component
  const navigation = useNavigation();
  return (
    <VStack space="lg">
      <Pressable onPress={() => navigation.navigate(screenName)}>
        <HStack className="justify-between items-center">
          <HStack space="md">
            <Icon as={IconComponent} />
            <Text>{title}</Text>
          </HStack>
          {/* <Icon as={isOpen ? ChevronDown : ChevronRight} /> */}
        </HStack>
      </Pressable>
    </VStack>
  );
};
