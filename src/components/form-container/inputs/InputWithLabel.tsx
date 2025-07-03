import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { isRTL } from "../../../utils/operation/isRTL";
import { Entypo } from "@expo/vector-icons";
import PopupModal from "../../../utils/component/PopupModal";
import { handleSubmitWithCallback } from "../../../utils/operation/handleSubmitWithCallback";
import ScratchVoucherCard from "../../../Schemas/MenuSchema/ScratchVoucherCard.json";
import ScratchVoucherCardActions from "../../../Schemas/MenuSchema/ScratchVoucherCardActions.json";
import PaymentOptions from "../../../Schemas/MenuSchema/PaymentOptions.json";
import { SetReoute } from "../../../../request";
import { formatCount } from "../../../utils/operation/formatCount";

export default function InputWithLabel({
  value,
  enable,
  title,
  fieldName,
  control,
  type,
  lookupDisplayField,
  ...props
}) {
  const [editValue, setEditValue] = useState("0");
  const [disable, setDisable] = useState(false);
  const [reqError, setReqError] = useState(null);
  const {
    control: PopupControl,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const originalValue = parseFloat(
    lookupDisplayField ? value?.[lookupDisplayField] : value || 0
  );
  const currentEdit = parseFloat(editValue || 0);
  const labelValue = originalValue - currentEdit;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputChange = (val, onChange) => {
    let parsed = parseFloat(val);
    if (isNaN(parsed)) parsed = 0;

    if (parsed > originalValue) {
      parsed = originalValue;
    } else if (parsed < 0) {
      parsed = 0;
    }
    console.log();

    setEditValue(parsed.toString());
    onChange(parsed.toString()); // ensure we update form state
  };

  const renderInput = (onChange, onBlur) => (
    <View className="relative rounded-lg flex-1">
      <TextInput
        onBlur={onBlur}
        onChangeText={(val) => handleInputChange(val, onChange)}
        value={editValue}
        placeholder={title}
        keyboardType="numeric"
        placeholderTextColor="#9CA3AF" // Tailwind's gray-400
        className={
          "peer bg-transparent text-gray-800 " +
          "placeholder-transparent px-2 border-2 border-gray-400 " +
          "focus:border-sky-600 focus:outline-none" +
          "flex-1 bg-body p-3 rounded-l-lg text-sm border border-border " +
          `${isRTL() ? "text-right" : "text-left"}`
        }
      />
      <Text
        className={
          "absolute left-2 -top-2 text-sm text-gray-500 bg-body px-1 " +
          "peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 " +
          "peer-placeholder-shown:top-2 peer-focus:-top-2 peer-focus:text-sky-600 " +
          "peer-focus:text-sm transition-all"
        }
      >
        {props.placeholder}
      </Text>
    </View>
  );
  const postAction =
    ScratchVoucherCardActions &&
    ScratchVoucherCardActions.find(
      (action) => action.dashboardFormActionMethodType === "Post"
    );
  const onSubmit = async (data: any) => {
    await handleSubmitWithCallback({
      data,
      setDisable,
      action: postAction,
      proxyRoute: PaymentOptions.projectProxyRoute,
      setReq: setReqError,
      onSuccess: (resultData) => {
        setIsModalVisible(false);
        console.log("done");
        reset();
      },
    });
  };
  useEffect(() => {
    console.log(PopupControl._formValues, errors, "data");
  }, [watch()]);
  const additionalButton = () => {
    return (
      <TouchableOpacity
        className="p-2 me-2 w-fit rounded-lg bg-accent items-center justify-center"
        onPress={() => setIsModalVisible(true)}
      >
        <Entypo name="plus" size={20} className="!text-body" />
      </TouchableOpacity>
    );
  };
  const label = (
    <View className="bg-accent px-4 py-3 flex flex-row justify-center items-center h-full">
      <Text className="text-body text-sm">{labelValue}</Text>
    </View>
  );

  return (
    <View>
      {isRTL() ? (
        <View className="flex-row mt-2 items-center">
          <PopupModal
            isOpen={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSubmit={async () => {
              await handleSubmit(onSubmit);
            }}
            control={control}
            schema={ScratchVoucherCard}
            errors={reqError || errors}
            disable={disable}
          />
          {type === "additionalInputWithLabel" && additionalButton()}
          <View className="bg-accent px-4 py-3 flex flex-row justify-center items-center h-full rounded-r-lg">
            <Text className="text-body text-sm">{labelValue}</Text>
          </View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(val) => handleInputChange(val, onChange)}
                value={editValue}
                placeholder={title}
                keyboardType="numeric"
                className={
                  "flex-1 bg-body p-3 rounded-l-lg text-sm border border-border " +
                  `${isRTL() ? "text-right" : "text-left"}`
                }
              />
            )}
            name={fieldName}
          />
        </View>
      ) : (
        <View className="flex-row mt-2 items-center">
          {type === "additionalInputWithLabel" && additionalButton()}
          <PopupModal
            isOpen={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              reset();
            }}
            onSubmit={async () => {
              console.log("begin");

              await handleSubmit(onSubmit)();
            }}
            headerTitle={
              ScratchVoucherCard.dashboardFormSchemaInfoDTOView.addingHeader
            }
            control={PopupControl}
            schema={ScratchVoucherCard}
            errors={reqError || errors}
            disable={disable}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) =>
              renderInput(onChange, onBlur)
            }
            name={fieldName}
          />
          <View className="bg-accent px-4 py-3 flex flex-row justify-center items-center h-full rounded-r-lg">
            <Text className="text-body text-sm">{formatCount(labelValue)}</Text>
          </View>
          {/* <TextParameter {...props} /> */}
        </View>
      )}
    </View>
  );
}
