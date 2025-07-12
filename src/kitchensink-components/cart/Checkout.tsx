import { View, Text, Platform } from "react-native";
import React, { useEffect, useState } from "react";
// import { WebView } from "react-native-webview";
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

      if (res?.data?.beginTimeToFCheckout && res?.data?.endTimeToFCheckout) {
        const now = new Date();
        const begin = new Date(res.data.beginTimeToFCheckout);
        const end = new Date(res.data.endTimeToFCheckout);

        // Check if now is within allowed time
        if (now >= begin && now <= end) {
          setTimeAllowed(true);
        } else {
          setTimeAllowed(false);
          setCheckoutFiring(false);
        }
      }
    };

    fetchData();
  }, [isPaid]);

  const handleUrlChange = (url) => {
    try {
      const parsedUrl = new URL(url);
      const params = new URLSearchParams(parsedUrl.search);
      const paymentStatus = params.get("paymentStatus");

      if (paymentStatus === "true") {
        setIsPaid(true);
        setCheckoutFiring(false);
      }
    } catch (err) {
      console.warn("Invalid URL:", err);
    }
  };

  // If shift time expired
  if (!timeAllowed) {
    return (
      <View className="p-4">
        <Text className="text-red-600 text-center font-semibold">
          Checkout time window has expired.
        </Text>
      </View>
    );
  }

  // If no valid link or payment is done
  if (!result?.success || !result.data?.validationLink || result.data?.isDone) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === "web" && (
        <iframe
          src={result.data.validationLink}
          title="WebView"
          width="100%"
          height="600px"
          style={{ border: "none" }}
          onLoad={(e) => {
            try {
              const frameUrl = e.target?.contentWindow?.location?.href;
              if (frameUrl) handleUrlChange(frameUrl);
            } catch {
              // Cross-origin may block access
            }
          }}
        />
      )}
    </View>
  );
}
