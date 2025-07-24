import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import {
  Heading,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  VStack,
} from "../../../components/ui";
import { onApply } from "../../components/form-container/OnApply";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { getField } from "../../utils/operation/getField";
import AddressLocationSchema from "../../Schemas/AddressLocation/AddressLocation.json";
import CreditsSchema from "../../Schemas/Profile/CreditsSchema.json";
import CartSchema from "../../Schemas/MenuSchema/CartSchema.json";
import CartSchemaActions from "../../Schemas/MenuSchema/CartSchemaActions.json";
import PopupModal from "../../utils/component/PopupModal";
import { theme } from "../../Theme";
import { formatCount } from "../../utils/operation/formatCount";
import { useWS } from "../../../context/WSProvider";
import { useNavigation } from "@react-navigation/native";
import { initialState } from "../../components/Pagination/initialState";
import reducer from "../../components/Pagination/reducer";
import { useNetwork } from "../../../context/NetworkContext";
import { SetReoute } from "../../../request";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
import { WSMessageHandler } from "../../utils/WS/handleWSMessage";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { prepareLoad } from "../../utils/operation/loadHelpers";
import { createRowCache } from "../../components/Pagination/createRowCache";
import { useCart } from "../../../context/CartProvider";
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
  const { cartState, cartFieldsType } = useCart();

  const [selectedMethod, setSelectedMethod] = useState("card");

  const creditField = getField(
    CreditsSchema.dashboardFormSchemaParameters,
    "credit",
    false
  );

  const pointsField = getField(
    CreditsSchema.dashboardFormSchemaParameters,
    "points",
    false
  );
  const displayLookupParam =
    AddressLocationSchema.dashboardFormSchemaParameters.find(
      (pram) => pram.parameterType == "displayLookup"
    );
  // Helper: Get formatted address
  const getAddress = () => {
    if (selectedTab === 0)
      return localization.Hum_screens.orders.pickup || "Pickup";
    if (!selectedLocation) return "No address selected";
    console.log(selectedLocation);

    return `${selectedLocation[displayLookupParam.lookupDisplayField]}`;
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
      haveFooter={false}
      onClose={() => {}}
      onSubmit={() => {}}
      control={{}}
      isFormModal={false}
      haderTitle="Invoice Summary"
    >
      <View className="bg-body p-4 rounded-2xl shadow-md w-full max-w-md">
        {/* 🧾 Order Items */}
        <Text className="text-base font-semibold mb-2">Order Items</Text>
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
        e{/* 🧮 Summary */}
        <Text className="text-base font-semibold mt-5 mb-2">Summary</Text>
        {/* <InvoiceSummary row={row} setRow={() => {}} /> */}
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
              {formatCount(row[creditField.lookupDisplayField])}
            </Text>
          </HStack>
          <HStack space="xs" className="items-center mt-1">
            <FontAwesome name="star" size={14} color="#facc15" />
            <Text className="text-primary-custom text-sm">
              {pointsField.parameterTitel}:{" "}
              {formatCount(row[pointsField.lookupDisplayField])}
            </Text>
          </HStack>
        </VStack>
        {/* 🏠 Address */}
        <Text className="text-base font-semibold mt-5 mb-2">Address</Text>
        <Text className="text-sm text-primary-custom">{getAddress()}</Text>
        {/* 🧾 Debug Info (Optional) */}
        {/* <Text>isFastWay: {row.isFastWay?.toString()}</Text> */}
        {/* <Text>Selected Tab: {selectedTab}</Text> */}
        {/* ✅ Confirm Button */}
        <TouchableOpacity className="bg-green-600 mt-5 py-3 rounded-xl">
          <Text className="text-body text-center font-semibold">
            Confirm & Pay
          </Text>
        </TouchableOpacity>
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
