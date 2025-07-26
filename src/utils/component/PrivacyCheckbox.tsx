import React, { useEffect, useState } from "react";
import { View, Image, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "../../../components/ui";
import { useSelector } from "react-redux";
//!make shema for that filed name :isFastWay type:cheackBox
export default function PrivacyCheckbox({ row, setRow }) {
  const [showHint, setShowHint] = useState(false);
  const [isChecked, setIsChecked] = useState(row.isFastWay | false);
  const selectedTab = useSelector((state: any) => state.location?.selectedTab);
  if (selectedTab !== 1) {
    return null;
  }
  console.log("PrivacyCheckbox");
  return (
    <View className="flex-row items-center space-x-2 relative">
      {/* Gluestack Checkbox */}

      <Checkbox
        size="sm"
        value="accept Privacy"
        aria-label="accept Privacy"
        className="items-center"
        isChecked={isChecked} // Controlled checked state
        onChange={(checked) => {
          setIsChecked(checked === true);
          setRow({ ...row, isFastWay: checked });
        }}
      >
        <CheckboxIndicator>
          <CheckboxIcon
            as={() => (
              <AntDesign name="check" size={12} className="text-body" />
            )}
          />
        </CheckboxIndicator>

        {/* Custom image label */}
        <CheckboxLabel>
          <Image
            source={require("../../../assets/display/fastWayIcon.jpg")}
            className="rounded"
          />
        </CheckboxLabel>
      </Checkbox>

      {/* Hover or pressable question icon with hint */}
      <Pressable
        onPressIn={() => setShowHint(true)}
        onPressOut={() => setShowHint(false)}
        className="ml-2"
      >
        <AntDesign name="questioncircleo" size={16} color="#888" />
        {showHint && (
          <View className="absolute top-6 left-0 z-50 bg-gray-800 p-2 rounded w-44">
            <Text className="text-white text-xs">
              This confirms you accept our privacy policy.
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}
