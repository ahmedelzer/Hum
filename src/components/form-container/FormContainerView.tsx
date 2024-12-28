import { View, Text } from "react-native";
import React from "react";

import { Button, ButtonIcon } from "@/components/ui/button";
import { AddIcon, Icon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { useNavigation } from "@react-navigation/native";
import { HStack } from "@/components/ui/hstack";
import { formContainerSchema } from "./FormContainerSchema";

const LiveGatesView = () => {
  const navigation = useNavigation();

  return (
    <>
      {formContainerSchema.map((schema) => (
        <View key={schema.dashboardFormSchemaID}>
          {schema.schemaType && (
            <View key={schema.dashboardFormSchemaInfoDTOView.schemaHeader}>
              <Text>
                {schema.dashboardFormSchemaInfoDTOView.schemaHeader} LiveGates
              </Text>
              <Box>
                {/* <Button variant="solid" className="mt-2">
                  <ButtonIcon
                    onPress={() =>
                      navigation.navigate("LiveGatesView" as never)
                    }
                    as={AddIcon}
                    className="ml-2"
                  />
                </Button> */}

                {schema.dashboardFormSchemaParameters.map((parameter) => (
                  <View key={parameter.dashboardFormSchemaParameterID}>
                    {parameter.parameterType === "text" && (
                      <Text>
                        {parameter.parameterTitel} formContainerSchema
                      </Text>
                    )}
                    {parameter.parameterType === "Button" && (
                      <Button
                        onPress={() =>
                          navigation.navigate("LiveGateView" as never)
                        }
                        variant="solid"
                        className="mt-2 color-black">
                        <Icon as={AddIcon} className="ml-2" />
                      </Button>
                    )}
                    {parameter.parameterType === "HorizontalLiveCards" && (
                      <HStack space="lg">
                        <Text>{parameter.parameterTitel}</Text>
                        <Text>{parameter.parameterTitel}</Text>
                        <Text>{parameter.parameterTitel}</Text>
                      </HStack>
                    )}
                    {parameter.parameterType === "Chat" && (
                      <Text>{parameter.parameterTitel}</Text>
                    )}
                  </View>
                ))}
              </Box>
            </View>
          )}
        </View>
      ))}
    </>
  );
};

export default LiveGatesView;
