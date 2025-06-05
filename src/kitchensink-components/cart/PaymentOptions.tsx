import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { CollapsibleSection } from "../../utils/component/Collapsible";
import InputWithAction from "../../utils/component/InputWithAction";
import InputWithLabel from "../../utils/component/InputWithLabel";
import { Entypo } from "@expo/vector-icons";

const PaymentOptions = ({ onApply }: { onApply: (options: any) => void }) => {
  const [voucher, setVoucher] = useState("");
  const [points, setPoints] = useState("0");
  const [credit, setCredit] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  const handleApply = () => {
    onApply({
      voucher,
      points: parseFloat(points) || 0,
      credit: parseFloat(credit) || 0,
    });
  };

  return (
    <View className="mt-6 border border-accent rounded-xl p-4">
      <CollapsibleSection
        title="Special Request"
        icon={null}
        expandedSection={expandedSection}
        toggleSection={toggleSection}
        setheader={true}
      >
        <View className="space-y-4">
          {/* Voucher */}
          {/* <View className="my-1">
            <Text className="text-sm font-semibold">Voucher Code</Text>
            <InputWithAction
              // className="border border-border rounded-lg p-2 text-base text-text"
              submitButtonText={"submit"}
              // onSubmitFun={}
              placeholder="Enter voucher code"
            />
          </View> */}

          {/* Redeem Points */}
          <InputWithLabel
            placeholder="Enter credit"
            maximValue={1000}
            labelText={"Credit"}
            defaultValue={points}
          />
          <View className="mt-2">
            <InputWithLabel
              placeholder="Enter points"
              maximValue={1000}
              labelText={"Redeem Points"}
              defaultValue={points}
              additionalAction={
                <TouchableOpacity
                  className="p-2 me-2 w-fit rounded-lg bg-accent items-center justify-center"
                  // onPress={() => setIsModalVisible(true)}
                >
                  <Entypo name="plus" size={20} className="!text-body" />
                </TouchableOpacity>
              }
            />
          </View>
        </View>
      </CollapsibleSection>
    </View>
  );
};

export default PaymentOptions;
