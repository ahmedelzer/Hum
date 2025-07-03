import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { I18nManager } from "react-native";
import { HStack, Icon, Pressable, Text, VStack } from "../../../components/ui";
import ActionBar from "../../components/cards/ActionBar";
import { theme } from "../../Theme";
import { isRTL } from "../operation/isRTL";

export const CollapsibleSection = ({
  title,
  icon: IconComponent,
  children,
  withSpecialAction = false,
  setheader = false,
  textColor = theme.text,
  iconColor = theme.text,
  bgChildrenColor = theme.body,
  buttonClassName = "",
  defaultExpandedSection = false,
}) => {
  const navigation = !setheader && useNavigation();
  const [openAction, setOpenAction] = useState(true);
  const [expandedSection, setExpandedSection] = useState(
    defaultExpandedSection
  );
  const toggleSection = () => {
    setExpandedSection(!expandedSection);
  };

  function handlePress() {
    if (!withSpecialAction) {
      toggleSection();
    } else {
      setOpenAction(!openAction);
    }
  }
  useLayoutEffect(() => {
    if (!setheader) {
      navigation.setOptions({
        headerTitle: () =>
          openAction ? (
            <ActionBar
              selectedItems={[]}
              // setSelectedItems={setSelectedItems}
            />
          ) : null,
      });
    }
  }, [navigation, openAction]);
  //todo make argument for all colors and set init values
  return (
    <VStack space="lg">
      <Pressable
        onPress={handlePress}
        onLongPress={handlePress}
        className={buttonClassName}
      >
        <HStack className="justify-between items-center">
          <HStack space="md">
            {IconComponent && <Icon as={IconComponent} className="text-text" />}
            <Text style={{ color: textColor }}>{title}</Text>
          </HStack>
          <Icon
            as={() =>
              expandedSection ? (
                <Feather
                  name="chevron-down"
                  size={24}
                  style={{ color: iconColor }}
                />
              ) : (
                <Feather
                  name={isRTL() ? "chevron-left" : "chevron-right"}
                  size={24}
                  style={{ color: iconColor }}
                />
              )
            }
          />
        </HStack>
      </Pressable>
      {expandedSection && (
        <VStack
          style={{
            backgroundColor: bgChildrenColor,
          }}
          className={`p-2 border-b border-card shadow-sm rounded-lg`}
        >
          {children}
        </VStack>
      )}
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
