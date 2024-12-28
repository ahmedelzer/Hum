import { View, Text, StyleSheet } from "react-native";
//@ts-ignore
import { Column, Grid, Row } from "react-native-responsive-grid";
import { Sm } from "./Sm";

import DataCellRender from "./DataCellRender";
import {
  Button,
  ButtonText,
  CloseIcon,
  HelpCircleIcon,
  HStack,
  Icon,
  Pressable,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from "../../../components/ui";
function FormContainer({ tableSchema, row, errorResult, control }: any) {
  const toast = useToast();

  const actionField = tableSchema?.dashboardFormSchemaParameters?.find(
    (e: any) => e.isEnable
  ).parameterField;

  function SetValue(param: any | undefined) {
    if (param.lookupID) {
      return row;
    } else {
      return row[param.parameterField];
    }
  }
  // if()
  if (!toast.isActive("1")) {
    // showNewToast();
  }
  // showNewToast();
  return (
    <View style={styles.row}>
      <Grid>
        {({ state, setState }: any) => (
          <Row>
            {tableSchema?.dashboardFormSchemaParameters
              ?.filter((column: any) => !column.isIDField)
              .map((param: any) => (
                <Column
                  size={Sm(param)}
                  className="px-2"
                  key={param.parameterField}
                >
                  <DataCellRender
                    //@ts-ignore
                    isActionField={
                      actionField === param.parameterField ? true : false
                    }
                    control={control}
                    data={param}
                    value={SetValue(param)}
                    onChange={() => {}}
                    errorResult={errorResult}
                  />
                </Column>
              ))}
          </Row>
        )}
      </Grid>
    </View>
  );
}
const showNewToast = () => {
  const toast = useToast();
  const newId = "1";
  toast.show({
    id: newId,
    placement: "top",
    duration: 3000,
    render: ({ id }) => {
      const uniqueToastId = "toast-" + id;
      return (
        <Toast
          action="error"
          variant="outline"
          nativeID={uniqueToastId}
          className="p-4 gap-6 border-error-500 w-full shadow-hard-5 max-w-[443px] flex-row justify-between"
        >
          <HStack space="md">
            <Icon as={HelpCircleIcon} className="stroke-error-500 mt-0.5" />
            <VStack space="xs">
              <ToastTitle className="font-semibold text-error-500">
                Error!
              </ToastTitle>
              <ToastDescription size="sm">
                Something went wrong.
              </ToastDescription>
            </VStack>
          </HStack>
          <HStack className="min-[450px]:gap-3 gap-1">
            <Button variant="link" size="sm" className="px-3.5 self-center">
              <ButtonText>Retry</ButtonText>
            </Button>
            <Pressable onPress={() => toast.close(id)}>
              <Icon as={CloseIcon} />
            </Pressable>
          </HStack>
        </Toast>
      );
    },
  });
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    display: "flex",
    flex: 1,
  },
  col: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    backgroundColor: "black",
  },
});
export default FormContainer;
