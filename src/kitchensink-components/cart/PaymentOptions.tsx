import { default as React, useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { GetProjectUrl, SetReoute } from "../../../request";
import { theme } from "../../Theme";
import { initialState } from "../../components/Pagination/initialState";
import reducer from "../../components/Pagination/reducer";
import FormContainer from "../../components/form-container/FormContainer";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
import { WSMessageHandler } from "../../utils/WS/handleWSMessage";
import { CollapsibleSection } from "../../utils/component/Collapsible";
import { getField } from "../../utils/operation/getField";
// import { LocalizationContext } from "../../../context/LocalizationContext";
import PaymentOptionsSchema from "../../Schemas/MenuSchema/PaymentOptions.json";
import PaymentOptionsActions from "../../Schemas/MenuSchema/PaymentOptionsActions.json";
import useFetch from "../../../components/hooks/APIsFunctions/useFetch";

const PaymentOptions = ({ onApply }: { onApply: (options: any) => void }) => {
  const [voucher, setVoucher] = useState("");
  const [points, setPoints] = useState("0");
  const [credit, setCredit] = useState("");
  const [row, setRow] = useState({});
  const [_WSsetMessage, setWSsetMessage] = useState("{}");
  const [WS_Connected, setWS_Connected] = useState(false);
  const wsAction =
    PaymentOptionsActions &&
    PaymentOptionsActions.find(
      (action) => action.dashboardFormActionMethodType.toLowerCase() === "ws"
    );
  const getAction =
    PaymentOptionsActions &&
    PaymentOptionsActions.find(
      (action) => action.dashboardFormActionMethodType.toLowerCase() === "get"
    );
  SetReoute(PaymentOptionsSchema.projectProxyRoute);
  const { data, error, isLoading } = useFetch(
    `/${getAction.routeAdderss}`,
    GetProjectUrl()
  );
  useEffect(() => {
    if (!isLoading && data) {
      setRow(data);
    }
  }, [isLoading, data]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    clearErrors,
  } = useForm({});

  const paymentOptionsFieldsType = {
    idField: PaymentOptionsSchema.idField,
    dataSourceName: PaymentOptionsSchema.dataSourceName,
  };

  // 🌐 WebSocket connect effect
  useEffect(() => {
    if (WS_Connected) return;

    SetReoute(PaymentOptionsSchema.projectProxyRoute);

    ConnectToWS(setWSsetMessage, setWS_Connected, {}, wsAction)
      .then(() => console.log("🔌 Cart WebSocket connected"))
      .catch((e) => console.error("❌ Cart WebSocket error", e));
  }, [setWS_Connected]);

  // ✅ Callback to update reducer
  const paymentOptionsCallbackReducerUpdate = async (ws_updatedRow) => {
    console.log(ws_updatedRow, "ws_updatedRow payment options");

    setRow(ws_updatedRow.rows);
  };

  // 📨 WebSocket message handler
  useEffect(() => {
    if (row) return;
    if (!_WSsetMessage) return;

    const handlerCartWSMessage = new WSMessageHandler({
      _WSsetMessage, // match param name
      fieldsType: paymentOptionsFieldsType,
      rows: row,
      totalCount: 0,
      callbackReducerUpdate: paymentOptionsCallbackReducerUpdate,
    });
    handlerCartWSMessage.process();
  }, [_WSsetMessage, row]);

  return (
    <View className="mt-6 border border-border bg-body rounded-xl p-2 w-full">
      <CollapsibleSection
        title={PaymentOptionsSchema.dashboardFormSchemaInfoDTOView.schemaHeader}
        icon={null}
        setheader={true}
        iconColor={theme.body}
        textColor={theme.body}
        buttonClassName={
          "rounded-xl p-2 !bg-accent text-lg font-bold text-body"
        }
      >
        <View className="overflow-auto w-full flex-1">
          <View className="w-fit max-w-full shrink">
            <FormContainer
              tableSchema={PaymentOptionsSchema}
              row={row}
              errorResult={{}}
              control={control}
            />
          </View>
        </View>
      </CollapsibleSection>
    </View>
  );
};

export default PaymentOptions;

{
  /* <View className="space-y-4">
          {/* Voucher */
}
{
  /* <View className="my-1">
            <Text className="text-sm font-semibold">Voucher Code</Text>
            <InputWithAction
              // className="border border-border rounded-lg p-2 text-base text-text"
              submitButtonText={"submit"}
              // onSubmitFun={}
              placeholder="Enter voucher code"
            />
          </View> */
}

{
  /* Redeem Points */
}
// <InputWithLabel
//   placeholder="Enter credit"
//   maximValue={1000}
//   labelText={"Credit"}
//   defaultValue={points}
// />
// <View className="mt-2 overflow-auto">
//   <InputWithLabel
//     placeholder="Enter points"
//     maximValue={1000}
//     labelText={"Redeem Points"}
//     defaultValue={points}
//     additionalAction={
// <TouchableOpacity
//   className="p-2 me-2 w-fit rounded-lg bg-accent items-center justify-center"
//   // onPress={() => setIsModalVisible(true)}
// >
//   <Entypo name="plus" size={20} className="!text-body" />
// </TouchableOpacity>
//     }
//   />
// </View>
// </View> */}
