import { View, Text } from "react-native";
import React, { useState } from "react";
import GoBackHeader from "../header/GoBackHeader";
import FormContainer from "../form-container/FormContainer";
import { useForm } from "react-hook-form";
import schema from "../../Schemas/MenuSchema/FilterSchema.json";
export default function MenuFilter() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <View className="flex-1 bg-body">
      {/* Header */}
      <GoBackHeader title={"Filters"} />
      <View className="flex flex-row items-end justify-end my-1">
        <Text className="text-2xl font-bold text-accent">Clear all</Text>
      </View>
      {/* content */}
      {/* <View> */}
      <FormContainer
        tableSchema={schema}
        row={{}}
        errorResult={{}}
        control={control}
      />
      {/* </View> */}
    </View>
  );
}
