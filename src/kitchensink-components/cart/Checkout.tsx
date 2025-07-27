import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { HStack, VStack } from "../../../components/ui";
import { useCart } from "../../../context/CartProvider";
import { onApply } from "../../components/form-container/OnApply";
import NearestBranches from "../../Schemas/AddressLocation/NearestBranches.json";
import AddressLocationSchema from "../../Schemas/AddressLocation/AddressLocation.json";
import CustomerInfoSchema from "../../Schemas/MenuSchema/CartInfoSchema.json";
import PaymentOptionsSchema from "../../Schemas/MenuSchema/PaymentOptions.json";
import { theme } from "../../Theme";
import PopupModal from "../../utils/component/PopupModal";
import { formatCount } from "../../utils/operation/formatCount";
import { getField } from "../../utils/operation/getField";
import PrivacyCheckbox from "../../utils/component/PrivacyCheckbox";
import { covertPointsToCredits } from "../../utils/operation/covertPointsToCredits";

export default function Checkout({
  postAction,
  row,
  proxyRoute,
  setCheckoutFiring,
}) {
  const [isPaid, setIsPaid] = useState(false);
  const [result, setResult] = useState(null);
  const [timeAllowed, setTimeAllowed] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const callCount = useRef(0);
  const localization = useSelector((state) => state.localization.localization);
  const fieldsType = useSelector((state) => state.menuItem.fieldsType);
  const selectedTab = useSelector((state) => state.location.selectedTab);
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );
  const selectedNode = useSelector(
    (state) => state.location.selectedNodePickup
  );

  const { cartState, cartFieldsType } = useCart();

  const [selectedMethod, setSelectedMethod] = useState("card");
  const paymentRow = useSelector((state) => state.payment.paymentRow);

  const creditField = getField(
    PaymentOptionsSchema.dashboardFormSchemaParameters,
    "inputWithLabel",
    false
  );

  const pointsField = getField(
    PaymentOptionsSchema.dashboardFormSchemaParameters,
    "additionalInputWithLabel",
    false
  );
  const displayLookupParamAddress =
    AddressLocationSchema.dashboardFormSchemaParameters.find(
      (pram) => pram.parameterType == "displayLookup"
    );
  const displayLookupParamNode =
    NearestBranches.dashboardFormSchemaParameters.find(
      (pram) => pram.parameterType == "displayLookup"
    );
  const {
    rows: cartRows,
    totalCount: cartTotalCount,
    loading: cartLoading,
  } = cartState;
  const params = CustomerInfoSchema?.dashboardFormSchemaParameters ?? [];

  const cartInfoFieldsType = {
    netAmount: getField(params, "netAmount", false),
  };
  const requiredAmount =
    row[cartInfoFieldsType.netAmount.parameterField] -
    parseFloat(row[creditField.parameterField]) -
    covertPointsToCredits(parseFloat(row[pointsField.parameterField]));
  // Helper: Get formatted address
  const getAddress = () => {
    if (selectedTab === 0)
      return localization.Hum_screens.orders.pickup || "Pickup";
    if (!selectedLocation) return "No address selected";
    console.log(selectedLocation);

    return `${selectedLocation[displayLookupParamAddress.lookupDisplayField]}`;
  };
  const handleUrlChange = (url) => {
    try {
      const parsedUrl = new URL(url);
      const params = new URLSearchParams(parsedUrl.search);
      const paymentStatus = params.get("paymentStatus");

      if (paymentStatus === "true") {
        setIsPaid(true);
        setModalVisible(false);
        setCheckoutFiring(false);
      }
    } catch (err) {
      console.warn("Invalid URL:", err);
    }
  };

  const handleCheckoutClick = async () => {
    if (callCount.current >= 2 || isPaid) return;

    callCount.current += 1;

    const res = await onApply(
      { ...row, isPaid: false },
      null,
      true,
      postAction,
      proxyRoute,
      null,
      row
    );

    setResult(res);

    if (res?.data?.isDone === true) {
      setIsPaid(true);
      setCheckoutFiring(false);
      return;
    }

    const newTime = res?.data?.newCartItemsAddedTime;
    if (newTime) {
      const now = new Date();
      const begin = new Date(newTime);
      const limitMinutes = 10;
      const end = new Date(begin.getTime() + limitMinutes * 60 * 1000);

      if (now >= begin && now <= end) {
        setTimeAllowed(true);
      } else {
        setTimeAllowed(false);
        setCheckoutFiring(false);
        return;
      }
    }

    if (res?.data?.validationLink) {
      setModalVisible(true);
    }
  };

  const onPayPress = () => {
    setIsPaid(true);
    setModalVisible(false);
    setCheckoutFiring(false);
  };
  console.log(row, creditField, selectedNode, "creditField");

  if (!timeAllowed) {
    return (
      <View className="p-4">
        <Text className="text-red-600 text-center font-semibold">
          Checkout time window has expired.
        </Text>
      </View>
    );
  }
  return (
    <PopupModal
      isOpen={true}
      haveFooter={true}
      footer={
        <TouchableOpacity className="bg-green-600 mt-5 py-3 px-5 rounded-xl">
          <Text className="text-body text-center font-semibold">
            Confirm & Pay
          </Text>
        </TouchableOpacity>
      }
      onClose={() => setCheckoutFiring(false)}
      onSubmit={() => {}}
      control={{}}
      isFormModal={false}
      headerTitle="🧾 Invoice Summary"
    >
      <View className="bg-body p-4 rounded-lg w-full max-w-md">
        <View className="flex-row justify-between">
          <View>
            <Text className="text-base font-semibold mt-5 mb-2">Branch</Text>
            <Text className="text-sm text-primary-custom">
              {selectedNode[displayLookupParamNode.lookupDisplayField]}
            </Text>
          </View>
          <View>
            <Text className="text-base font-semibold mt-5 mb-2">Address</Text>
            <Text className="text-sm text-primary-custom">{getAddress()}</Text>
          </View>
        </View>

        <View className="my-2">
          <PrivacyCheckbox row={row} setRow={() => {}} />
        </View>
        <FlatList
          data={cartRows}
          keyExtractor={(item) => item[fieldsType.idField]}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center mb-3">
              <View className="flex-1 pr-2">
                <Text className="font-medium">{item[fieldsType.text]}</Text>
                <Text className="text-sm text-primary-custom">
                  {item[fieldsType.description]}
                </Text>
                <Text className="text-sm">
                  Qty: {item[fieldsType.cardAction]}
                </Text>
              </View>
              <View className="items-end">
                {item[fieldsType.discount] > 0 && (
                  <Text className="text-sm line-through text-red-400">
                    {localization.menu.currency}{" "}
                    {item[fieldsType.price].toFixed(2)}
                  </Text>
                )}
                {item[fieldsType.priceAfterDiscount] >= 0 && (
                  <Text className="text-base font-semibold text-green-600">
                    {localization.menu.currency}{" "}
                    {item[fieldsType.priceAfterDiscount].toFixed(2)}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
        {/* 🧮 Summary */}
        <View className="mt-6 space-y-2">
          <View className="flex-row items-center space-x-2">
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              size={20}
              color="#6b7280"
            />
            <Text className="text-lg font-bold text-gray-800">Summary</Text>
          </View>

          <View className="flex-row justify-between items-center bg-gray-100 p-3 rounded-xl">
            <Text className="text-base text-gray-700 font-medium">
              {cartInfoFieldsType.netAmount.parameterTitel}
            </Text>
            <Text className="text-xl font-bold text-green-600">
              {localization.menu.currency}{" "}
              {row[cartInfoFieldsType.netAmount.parameterField]}
            </Text>
          </View>
        </View>
        {/* 💳 Payment Method */}
        <Text className="text-base font-semibold mt-5 mb-2">
          Payment Method
        </Text>
        <VStack>
          <HStack space="xs" className="items-center">
            <FontAwesome
              name="credit-card"
              size={14}
              color={theme.accentHover}
            />
            <Text className="text-primary-custom text-sm">
              {creditField.parameterTitel}:{" "}
              {formatCount(row[creditField.parameterField])}
            </Text>
          </HStack>
          <HStack space="xs" className="items-center mt-1">
            <FontAwesome name="star" size={14} color="#facc15" />
            <Text className="text-primary-custom text-sm">
              {pointsField.parameterTitel}:{" "}
              {formatCount(row[pointsField.parameterField])}
            </Text>
          </HStack>
          <TouchableOpacity
            className={`flex-row items-center mt-2 justify-between p-4 rounded-xl border ${"border-green-500 bg-green-50"}`}
          >
            <View className="flex-row items-center">
              <FontAwesome5 size={18} color={"#22c55e"} />
              <Text className="text-base text-gray-700">{paymentRow}</Text>
            </View>
            {/* {isSelected && ( */}
            <MaterialIcons name="check-circle" size={20} color="#22c55e" />
            {/* )} */}
          </TouchableOpacity>
        </VStack>
        <View className="mt-6 space-y-2">
          <Text className="text-lg font-bold text-gray-800">
            Required Amount
          </Text>

          <View className="flex-row justify-between items-center bg-yellow-50 border border-yellow-300 p-4 rounded-xl">
            <Text className="text-base font-medium text-yellow-800">
              You will pay
            </Text>
            <Text className="text-xl font-bold text-yellow-700">
              {localization.menu.currency} {requiredAmount.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </PopupModal>
  );
}
/*


////////////<PopupModal
      isOpen={true}
      haveFooter={false}
      onClose={() => {}}
      onSubmit={() => {}}
      control={{}}
      isFormModal={false}
      haderTitle="Invoice Summary"
    >
import React, { useEffect, useState } from "react";
import { View, Text, Platform, Modal, Pressable } from "react-native";
import { onApply } from "../../components/form-container/OnApply";

export default function Checkout({
  postAction,
  row,
  proxyRoute,
  setCheckoutFiring,
}) {
  const [isPaid, setIsPaid] = useState(false);
  const [result, setResult] = useState(null);
  const [timeAllowed, setTimeAllowed] = useState(true);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await onApply(
        { ...row, isPaid },
        null,
        true,
        postAction,
        proxyRoute,
        null,
        row
      );

      setResult(res);

      if (res?.data?.isDone === true) {
        setIsPaid(true);
        setCheckoutFiring(false);
        setShowIframe(false);
        return;
      }

      // 15 min time window validation
      if (res?.data?.newCartItemsAddedTime) {
        const now = new Date();
        const begin = new Date(res.data.newCartItemsAddedTime);
        const end = new Date(begin.getTime() + 15 * 60 * 1000);

        if (now >= begin && now <= end) {
          setTimeAllowed(true);
          if (res?.data?.validationLink) {
            setShowIframe(true);
          }
        } else {
          setTimeAllowed(false);
          setCheckoutFiring(false);
          setShowIframe(false);
        }
      }
    };

    fetchData();
  }, [isPaid]);

  const handleUrlChange = (url) => {
    try {
      const parsedUrl = new URL(url);
      const paymentStatus = parsedUrl.searchParams.get("paymentStatus");

      if (paymentStatus === "true") {
        setIsPaid(true);
        setShowIframe(false);
        setCheckoutFiring(false);
      }
    } catch (err) {
      console.warn("Invalid URL (cross-origin expected):", err);
    }
  };

  // Time expired
  if (!timeAllowed) {
    return (
      <View className="p-4">
        <Text className="text-red-600 text-center font-semibold">
          Checkout time window has expired.
        </Text>
      </View>
    );
  }

  // Payment is done or missing data
  if (!result?.success || !result.data?.validationLink || result.data?.isDone) {
    return null;
  }

  // Display payment in modal popup
  return (
    <View>
      {Platform.OS === "web" && showIframe && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={true}
          onRequestClose={() => setShowIframe(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.6)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View style={{ backgroundColor: "white", borderRadius: 8, width: "100%", maxWidth: 800, padding: 0 }}>
              <View style={{ alignItems: "flex-end", padding: 10 }}>
                <Pressable
                  onPress={() => setShowIframe(false)}
                  style={{
                    backgroundColor: "#ccc",
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>X Close</Text>
                </Pressable>
              </View>
              <iframe
                src={result.data.validationLink}
                width="100%"
                height="600"
                style={{ border: "none", borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
                onLoad={(e) => {
                  try {
                    const frameUrl = e.target?.contentWindow?.location?.href;
                    if (frameUrl) handleUrlChange(frameUrl);
                  } catch {
                    // Ignore CORS issue
                  }
                }}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
*/
