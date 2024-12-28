import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { gatesContainer } from "./GatesSchema";

import { useNavigation } from "@react-navigation/native";
import InputDisplay from "../input-display/InputDisplay";

const GatesView = () => {
  const navigation = useNavigation();

  return (
    <>
      {gatesContainer.map((schema) => (
        <View
          key={schema.dashboardFormSchemaID}
          className="flex-1  mx-4 gap-y-8">
          {/* {schema.schemaType && (
            <View key={schema.dashboardFormSchemaInfoDTOView.schemaHeader}>
              <Text>{schema.dashboardFormSchemaInfoDTOView.schemaHeader}</Text>
              <Box>
                <Button
                  onPress={() => navigation.navigate("LiveGateView" as never)}
                  variant="solid"
                  className="mt-2 color-black">
                  <ButtonIcon as={AddIcon} className="ml-2" />
                </Button>
                <Text>
                  {schema.dashboardFormSchemaInfoDTOView.schemaHeader}
                </Text>
              </Box>
            </View>
          )} */}
          {schema.dashboardFormSchemaParameters.map((item) => (
            <InputDisplay
              key={item.dashboardFormSchemaParameterID}
              row={{}}
              formSchemaParameter={item}
            />
          ))}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GatesView;
