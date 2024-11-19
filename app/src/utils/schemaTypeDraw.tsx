import { Button, ButtonText } from "@/components/ui/button";
import { HStack, View } from "../../components/ui";
import { Input, InputField, InputIcon } from "@/components/ui/input";

import React from "react";

export function schemaTypeDraw({ schema }: any) {
  switch (schema.schemaType) {
    case "Chat":
      return (
        <View>
          <HStack className="flex-1 items-center justify-between">
            <Input>
              <InputField onChange={() => console.log("text")} />
            </Input>
            <Button>
              <ButtonText>Send</ButtonText>
            </Button>
          </HStack>
        </View>
      );

    default:
      return null;
  }
}
