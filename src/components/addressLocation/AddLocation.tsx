import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Chase } from "react-native-animated-spinkit";
import { useDispatch, useSelector } from "react-redux";
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
import AddressLocationSchema from "../../Schemas/AddressLocation/AddressLocation.json";
import AddressLocationAction from "../../Schemas/AddressLocation/AddressLocationAction.json";
import LoadingScreen from "../../kitchensink-components/loading/LoadingScreen";
import { updateSelectedLocation } from "../../reducers/LocationReducer";
import PopupModal from "../../utils/component/PopupModal";
import { handleSubmitWithCallback } from "../../utils/operation/handleSubmitWithCallback";

export default function AddLocation({
  rows,
  onScroll,
  AddAddressLocation,
  loading,
}) {
  const idField = AddressLocationSchema.idField;
  const displayLookupParam =
    AddressLocationSchema.dashboardFormSchemaParameters.find(
      (pram) => pram.parameterType == "displayLookup"
    );
  const [location, setLocation] = useState(null);
  const [reqError, setReqError] = useState(null);
  const [disable, setDisable] = useState(null);
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );
  const localization = useSelector((state) => state.localization.localization);
  const locations = useSelector((state) => state.location.locations);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const postAction =
    AddressLocationAction &&
    AddressLocationAction.find(
      (action) => action.dashboardFormActionMethodType === "Post"
    );
  const onSubmit = async (data: any) => {
    await handleSubmitWithCallback({
      data,
      setDisable,
      action: postAction,
      proxyRoute: AddressLocationSchema.projectProxyRoute,
      setReq: setReqError,
      onSuccess: (resultData) => {
        AddAddressLocation(resultData);
        setIsModalVisible(false);
        dispatch(updateSelectedLocation(resultData));
      },
    });
  };
  useEffect(() => {
    if (
      !loading &&
      !Object.keys(selectedLocation).length > 0 &&
      rows.length > 0
    ) {
      dispatch(updateSelectedLocation(rows[0]));
    }
  }, [loading]);
  return (
    <View>
      <PopupModal
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={async () => {
          await handleSubmit(onSubmit);
        }}
        control={control}
        schema={AddressLocationSchema}
        errors={reqError || errors}
        disable={disable}
      />
      <View className="flex flex-row items-center space-x-3">
        <TouchableOpacity
          className="p-2 w-fit rounded-lg bg-accent items-center justify-center"
          onPress={() => setIsModalVisible(true)}
        >
          <Entypo name="plus" size={20} className="!text-body" />
        </TouchableOpacity>
        <Select
          value={selectedLocation[displayLookupParam.lookupDisplayField]} // only the id is passed around
          onValueChange={(selected) => {
            dispatch(updateSelectedLocation(selected)); // store full object
          }}
          className="flex-1 mx-2"
        >
          <SelectTrigger
            variant="outline"
            size="sm"
            className="flex-1 justify-between h-11"
          >
            <SelectInput
              placeholder="Select option"
              value={
                selectedLocation?.[displayLookupParam.lookupDisplayField] ?? ""
              }
              className="text-base text-text"
            />
            <SelectIcon as={AntDesign} name="down" className="mr-3 text-text" />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {loading && (
                <LoadingScreen LoadingComponent={<Chase size={40} />} />
              )}
              {rows?.length === 0 && !loading && (
                <Text className="text-center justify-center items-center flex-1 mt-4">
                  {localization.Hum_screens.menu.noItems}
                </Text>
              )}
              {rows.map((location) => (
                <SelectItem
                  label={location[displayLookupParam.lookupDisplayField]}
                  value={location}
                  key={location[idField]}
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </View>
    </View>
  );
}
