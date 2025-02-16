import { useNavigation } from "@react-navigation/native";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import React, { useLayoutEffect, useState } from "react";
import { HStack, Icon, Pressable, Text, VStack } from "../../components/ui";
import ActionBar from "../components/cards/ActionBar";
import HeaderParent from "../components/header/HeaderParent";
import { Feather } from "@expo/vector-icons";

export const CollapsibleSection = ({
  title,
  icon: IconComponent,
  children,
  expandedSection,
  toggleSection,
  withSpecialAction = false,
}) => {
  const isOpen = expandedSection === title;
  const navigation = useNavigation();
  const [openAction, setOpenAction] = useState(true);

  function handlePress() {
    if (!withSpecialAction) {
      toggleSection(title);
    } else {
      setOpenAction(!openAction);
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () =>
        openAction ? (
          <ActionBar
            selectedItems={[]}
            // setSelectedItems={setSelectedItems}
          />
        ) : null,
    });
  }, [navigation, openAction]);
  return (
    <VStack space="lg">
      <Pressable onPress={handlePress} onLongPress={handlePress}>
        <HStack className="justify-between items-center">
          <HStack space="md">
            <Icon as={IconComponent} />
            <Text>{title}</Text>
          </HStack>
          <Icon
            as={() =>
              isOpen ? (
                <Feather name="chevron-down" size={24} className="!text-text" />
              ) : (
                <Feather
                  name="chevron-right"
                  size={24}
                  className="!text-text"
                />
              )
            }
          />
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
