import { View, Text, StyleSheet } from "react-native";
//@ts-ignore
import { Column, Grid, Row } from "react-native-responsive-grid";
import { SmMobile, SmWeb } from "./Sm";

import DataCellRender from "./DataCellRender";
import {
  Button,
  ButtonText,
  CloseIcon,
  HelpCircleIcon,
  HStack,
  Icon,
  Pressable,
  VStack,
} from "../../../components/ui";
import { useDeviceInfo } from "../../utils/component/useDeviceInfo";
import SetComponentsPlatforms from "../../utils/component/SetComponentsPlatforms";
import { WebContainer } from "./WebContainer";
import { MobileContainer } from "./MobileContainer";
import { useEffect, useRef } from "react";
import { useErrorToast } from "./ShowErrorToast";
// import { useToastUtils } from "./ShowErrorToast";
function FormContainer({
  tableSchema,
  row,
  errorResult,
  control,
  ...props
}: any) {
  const errors = errorResult?.error?.errors || {};
  const { showErrorToast } = useErrorToast();
  // Convert error keys to lowercase
  const lowercaseErrors = Object.keys(errors).reduce((acc, key) => {
    acc[key.toLowerCase()] = errors[key];
    return acc;
  }, {});

  // Get expected field names from schema
  const expectedFields =
    tableSchema?.dashboardFormSchemaParameters?.map((param: any) =>
      param.parameterField?.toLowerCase()
    ) || [];

  // Get unmatched error messages (e.g., "userError")
  const globalErrorMessages = Object.entries(lowercaseErrors)
    .filter(([key]) => !expectedFields.includes(key)) // key not found in schema
    .map(([_, message]) => message); // get message(s)
  const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
    (e: any) => e.isEnable
  ).parameterField;
  // Show toast on global errors
  // Show the first global error as toast

  useEffect(() => {
    if (globalErrorMessages.length > 0) {
      showErrorToast("Error", `${globalErrorMessages[0]}`);
    }
  }, [errorResult, globalErrorMessages]);

  function SetValue(param: any | undefined) {
    if (
      param.lookupID ||
      param.parameterType === "areaMapLongitudePoint" ||
      param.parameterType === "mapLongitudePoint" ||
      param.parameterType === "rate"
    ) {
      return row;
    } else {
      return row[param.parameterField];
    }
  }
  return (
    <View>
      <SetComponentsPlatforms
        components={[
          {
            platform: "android",
            component: (
              <MobileContainer
                SetValue={SetValue}
                actionField={actionField}
                control={control}
                errorResult={errorResult}
                tableSchema={tableSchema}
                {...props}
              />
            ),
          },
          {
            platform: "ios",
            component: (
              <MobileContainer
                SetValue={SetValue}
                actionField={actionField}
                control={control}
                errorResult={errorResult}
                tableSchema={tableSchema}
                {...props}
              />
            ),
          },
          {
            platform: "web",
            component: (
              <WebContainer
                SetValue={SetValue}
                actionField={actionField}
                control={control}
                errorResult={errorResult}
                tableSchema={tableSchema}
                {...props}
              />
            ),
          },
        ]}
      />
    </View>
  );
}
export default FormContainer;
