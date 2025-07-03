import { View, Text } from "react-native";
import React from "react";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../../../components/ui";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import LoadingScreen from "../../kitchensink-components/loading/LoadingScreen";
import { Chase } from "react-native-animated-spinkit";
import { useSelector } from "react-redux";
import { useDeviceInfo } from "./useDeviceInfo";
export default function SelectComponent({
  selectedValue,
  onValueChange,
  mapData,
  idField,
  labelField,
  IconComponent = (
    <SelectIcon as={AntDesign} name="down" className="mr-3 text-text" />
  ),
  valueField = "",

  loading = false,
}) {
  const localization = useSelector((state) => state.localization.localization);
  const { os } = useDeviceInfo();
  return (
    <Select
      value={selectedValue}
      onValueChange={onValueChange}
      className="flex-1"
    >
      <SelectTrigger
        variant="unstyled"
        size="sm"
        className={`${os === "web" ? "!py-2" : ""} flex-1 flex-row items-center h-11 justify-between px-3 bg-transparent border border-border rounded-md`}
      >
        <SelectInput
          placeholder={localization.inputs.select.placeholder}
          value={selectedValue}
          className="text-base text-text"
        />
        {/* <FontAwesome name="edit" size={18} className="text-text ms-2" /> */}
        {IconComponent}
      </SelectTrigger>

      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {loading && <LoadingScreen LoadingComponent={<Chase size={40} />} />}
          {mapData?.length === 0 && !loading && (
            <Text className="text-center justify-center items-center flex-1 mt-4">
              {localization.Hum_screens.menu.noItems}
            </Text>
          )}
          {mapData?.map((language) => (
            <SelectItem
              key={language[idField]}
              label={language[labelField]}
              value={valueField.length > 0 ? language[valueField] : language}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
