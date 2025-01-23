import { View } from "react-native";
import React, { useState } from "react";
import {
  ButtonGroup,
  ButtonIcon,
  Icon,
  Button,
  Menu,
  AddIcon,
  ButtonText,
  MenuItem,
  MenuItemLabel,
  Center,
  Box,
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
  Divider,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  VStack,
} from "@/components/ui";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  FilterIcon,
  GlobeIcon,
  PlayIcon,
  SettingsIcon,
} from "lucide-react-native";
import FormContainer from "../form-container/FormContainer";
import { loginFormSchema } from "../../kitchensink-components/auth/signin/loginSchema";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

const SearchBarFilter = ({ schema }: any) => {
  const navigation = useNavigation();
  // console.log(schema, "schema from search bar filter");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const searchFilter = schema?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.isIDField && item?.parameterType === "collapse"
  );

  const [values, setValues] = useState(["Eng"]);
  return (
    <Menu
      className="mx-4 self-center rounded-xl"
      placement="top"
      offset={5}
      onclick
      disabledKeys={["Settings"]}
      useRNModal={true}
      trigger={({ ...triggerProps }) => {
        return (
          <Button
            {...triggerProps}
            size="sm"
            className="rounded-full"
            onPress={() => navigation.navigate("MenuFilter")}
          >
            <Icon as={FilterIcon} size="lg" color="#f2f2f2" />
          </Button>
        );
      }}
    >
      {/* New Settings Menu Item */}
      {/* <MenuItem key="Settings" textValue="Settings">
        <FormContainer
          tableSchema={loginFormSchema} // Use a different schema for settings if needed
          control={control}
          errorResult={errors}
          row={{
            username: "admin",
            password: "newpassword",
          }}
        />
      </MenuItem> */}
      {/* <MenuItem key="Add account" textValue="Add account">
        <Accordion
          size="sm"
          variant="unfilled"
          type="single"
          isCollapsible={true}
          isDisabled={false}
          className="border border-outline-200 rounded-lg"
        >
          <AccordionItem value="a">
            <AccordionHeader>
              <AccordionTrigger>
                {({ isExpanded }) => {
                  return (
                    <>
                      <AccordionTitleText>
                        How do I place an order?
                      </AccordionTitleText>
                      {isExpanded ? (
                        <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                      ) : (
                        <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                      )}
                    </>
                  );
                }}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <CheckboxGroup
                value={values}
                onChange={(keys) => {
                  setValues(keys);
                }}
              >
                <VStack space="xl">
                  <Checkbox value="Eng">
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Framer</CheckboxLabel>
                  </Checkbox>
                  <Checkbox value="invison">
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Invision Studio</CheckboxLabel>
                  </Checkbox>
                  <Checkbox value="adobe">
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Adobe XD</CheckboxLabel>
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </AccordionContent>
          </AccordionItem>
          <Divider />
          <AccordionItem value="b">
            <AccordionHeader>
              <AccordionTrigger>
                {({ isExpanded }) => {
                  return (
                    <>
                      <AccordionTitleText>
                        What payment methods do you accept?
                      </AccordionTitleText>
                      {isExpanded ? (
                        <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                      ) : (
                        <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                      )}
                    </>
                  );
                }}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <AccordionContentText>
                We accept all major credit cards, including Visa, Mastercard,
                and American Express. We also support payments through PayPal.
              </AccordionContentText>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </MenuItem> */}
    </Menu>
  );
};

export default SearchBarFilter;
