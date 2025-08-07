import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Platform, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddressLocationSchema from "../../Schemas/AddressLocation/AddressLocation.json";
import AddressLocationAction from "../../Schemas/AddressLocation/AddressLocationAction.json";
import { updateSelectedLocation } from "../../reducers/LocationReducer";
import PopupModal from "../../utils/component/PopupModal";
import SelectComponent from "../../utils/component/SelectComponent";
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
  const [disable, setDisable] = useState(false);
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
    console.log("clicked", data);

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
  console.log(reqError, errors, "aaaaa");
  return (
    <View>
      <PopupModal
        isOpen={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          Platform.OS !== "web" && reset();
        }}
        // onSubmit={async () => {
        //   handleSubmit(onSubmit);
        // }}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        headerTitle={
          AddressLocationSchema.dashboardFormSchemaInfoDTOView.addingHeader
        }
        row={{}}
        schema={AddressLocationSchema}
        errors={reqError || errors}
        disable={disable}
      />
      <View className="flex flex-row items-center">
        <TouchableOpacity
          className="p-2 w-fit rounded-lg bg-accent items-center justify-center me-2"
          onPress={() => setIsModalVisible(true)}
        >
          <Entypo name="plus" size={20} className="!text-body" />
        </TouchableOpacity>
        <SelectComponent
          idField={idField}
          labelField={displayLookupParam.lookupDisplayField}
          mapData={rows}
          onValueChange={(selected) => {
            dispatch(updateSelectedLocation(selected)); // store full object
          }}
          selectedValue={
            selectedLocation[displayLookupParam.lookupDisplayField]
          }
          valueField=""
          loading={loading}
        />
      </View>
    </View>
  );
}
