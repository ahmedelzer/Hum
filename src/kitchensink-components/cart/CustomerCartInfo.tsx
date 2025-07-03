import { View, Text } from "react-native";
import React from "react";
import useFetch from "../../../components/hooks/APIsFunctions/useFetch";
import { GetProjectUrl } from "../../../request";
import CustomerInfoSchema from "../../Schemas/MenuSchema/CartInfoSchema.json";
export default function CustomerCartInfo({ GetCustomerCartInfo }) {
  return (
    <View>
      {GetCustomerCartInfo &&
        CustomerInfoSchema?.dashboardFormSchemaParameters.map((i) => (
          <View
            className="flex-row mt-2 items-center justify-between"
            key={i.dashboardFormSchemaID}
          >
            <Text className="text-md">{i.parameterTitel}</Text>
            <Text className="text-md">
              {GetCustomerCartInfo[i.parameterField]}
            </Text>
          </View>
        ))}
    </View>
  );
}
