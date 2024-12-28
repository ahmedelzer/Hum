import { Button, ButtonText } from "@/components/ui/button";
import {
  Center,
  HStack,
  Modal,
  VStack,
  Card,
  Heading,
  Box,
  Text,
} from "../../components/ui";
import { Input, InputField } from "@/components/ui/input";

import React from "react";

export function parametersSchemaDraw({
  row,
  formSchemaParameter,
  // handleOnChange,
  value,
}: any) {
  switch (formSchemaParameter.parameterType) {
    case "text":
      return (
        <Input
          key={formSchemaParameter.dashboardFormSchemaParameterID}
          // disabled={!formSchemaParameter.isEnable}
          id={formSchemaParameter.parameterField}>
          <InputField
            value={value}
            placeholder={formSchemaParameter.parameterTitel}
            // onChange={(e) => handleOnChange(e)}
          />
        </Input>
      );
    case "Button":
      return (
        <Button
          key={formSchemaParameter.dashboardFormSchemaParameterID}
          disabled={!formSchemaParameter.isEnable}
          id={formSchemaParameter.parameterField}>
          {row[formSchemaParameter.parameterField]}
          <ButtonText>{formSchemaParameter.parameterTitel}</ButtonText>
        </Button>
      );
    case "HorizontalLiveCards":
      return (
        <HStack
          key={formSchemaParameter.dashboardFormSchemaParameterID}
          id={formSchemaParameter.parameterField}>
          <Card className="p-5 rounded-lg max-w-[360px] m-3"></Card>
        </HStack>
      );
    case "LiveChatView":
      return (
        <VStack className="flex-1 justify-between">
          <Text>{formSchemaParameter.parameterTitel}</Text>
          <Text>{formSchemaParameter.parameterTitel}</Text>
        </VStack>
      );
    case "VerticalLiveCards":
      return (
        <VStack
          key={formSchemaParameter.dashboardFormSchemaParameterID}
          id={formSchemaParameter.parameterField}>
          <Text>{formSchemaParameter.parameterTitel}</Text>
          <Text>{formSchemaParameter.parameterTitel}</Text>
        </VStack>
      );
    case "center":
      return (
        <Center
          key={formSchemaParameter.dashboardFormSchemaParameterID}
          id={formSchemaParameter.parameterField}>
          <Text>{formSchemaParameter.parameterTitel}</Text>
        </Center>
      );
    case "modal":
      return (
        <Modal
          key={formSchemaParameter.dashboardFormSchemaParameterID}
          id={formSchemaParameter.parameterField}>
          <Text>{formSchemaParameter.parameterTitel}</Text>
        </Modal>
      );

    default:
      return null;
  }
}
