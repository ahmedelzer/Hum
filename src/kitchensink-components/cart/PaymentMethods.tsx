import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import PopupModal from "../../utils/component/PopupModal";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../../../components/ui";
import InputWithAction from "../../utils/component/InputWithAction";
import { RadioParameter } from "../../components/form-container";
import { useForm } from "react-hook-form";
import { CollapsibleSection } from "../../utils/component/Collapsible";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../../reducers/PaymentReducer";

// Assume you have these components from your UI lib:

// const PaymentMethods = ({
// paymentMethods = [],
// onAddPaymentMethod,
// onSelect,
// selected,
// label = "Select Payment Method",
// }) => {
// const [isModalVisible, setIsModalVisible] = useState(false);

//   return (
//     <View className="mt-4">
//       {/* Optional modal to add method */}
//       <PopupModal
//         isOpen={isModalVisible}
//         onClose={() => setIsModalVisible(false)}
//         onSubmit={() => {
//           onAddPaymentMethod?.();
//           setIsModalVisible(false);
//         }}
//       />

//       <View className="flex-row items-center space-x-3">
//         <TouchableOpacity
//           className="p-2 rounded-lg bg-accent items-center justify-center"
//           onPress={() => setIsModalVisible(true)}
//         >
//           <Entypo name="plus" size={20} color="white" />
//         </TouchableOpacity>

//         <Select value={selected} onValueChange={onSelect} className="flex-1">
//           <SelectTrigger variant="outline" size="sm" className="h-11 flex-1">
//             <SelectInput
//               placeholder={label}
//               value={
//                 paymentMethods.find((m) => m.id === selected)?.name || ""
//               }
//               className="text-base text-text"
//             />
//             <SelectIcon as={AntDesign} name="down" className="mr-3 text-text" />
//           </SelectTrigger>

//           <SelectPortal>
//             <SelectBackdrop />
//             <SelectContent>
//               <SelectDragIndicatorWrapper>
//                 <SelectDragIndicator />
//               </SelectDragIndicatorWrapper>

// {paymentMethods.map((method) => (
//   <SelectItem
//     key={method.id}
//     value={method.id}
//     label={method.name}
//   />
// ))}
//             </SelectContent>
//           </SelectPortal>
//         </Select>
//       </View>
//     </View>
//   );
// };

// export default PaymentMethods;

export default function PaymentMethods({
  paymentMethods = [],
  onAddPaymentMethod,
  selected,
  label = "Select Payment Method",
}) {
  const [expanded, setExpanded] = useState(false);
  const paymentValueIndex = useSelector(
    (state) => state.payment.paymentValueIndex
  );
  const paymentRow = useSelector((state) => state.payment.paymentRow);
  const dispatch = useDispatch();
  const animation = useRef(new Animated.Value(0)).current;
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const toggleExpanded = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const maxHeight = 150; // Adjust based on content size
  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxHeight],
  });
  const values = ["cache", "visa"];
  useEffect(() => {
    dispatch(updatePayment({ index: watch().payment }));
  }, [watch()]);
  useEffect(() => {
    // console.log("====================================");
    // console.log(payment);
    // console.log("====================================");
    // !loading &&
    // rows.length > 0
    // if (!Object.keys(payment).length > 0) {
    dispatch(
      updatePayment({ index: watch().payment, payment: paymentMethods[0] })
    );
    // }
  }, []); //set loading here
  console.log("====================================");
  console.log(paymentRow, paymentValueIndex, "payment");
  console.log("====================================");
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
      {/* Header - toggle */}
      <View className="p-4 bg-accent rounded-lg mb-2">
        <CollapsibleSection
          title="Payment Methods"
          icon={null}
          expandedSection={expanded}
          toggleSection={toggleExpanded}
          setheader={true}
        >
          {/* Animated sliding container */}
          <Animated.View
            style={{ height: heightInterpolate, overflow: "hidden" }}
          >
            <RadioParameter
              control={control}
              enable={true}
              value={paymentValueIndex}
              fieldName={"payment"}
              values={values}
            />
            {paymentValueIndex === "1" && (
              <View className="mt-4">
                <View className="flex-row items-center space-x-3">
                  <TouchableOpacity
                    className="p-2 rounded-lg me-2 bg-accent items-center justify-center"
                    // onPress={() => setIsModalVisible(true)}
                  >
                    <Entypo name="plus" size={20} color="white" />
                  </TouchableOpacity>

                  <Select
                    value={paymentRow ? paymentRow.name : "error"} // only the id is passed around
                    onValueChange={(selected) => {
                      dispatch(
                        updatePayment({
                          index: control._formValues.payment,
                          paymentRow: selected,
                        })
                      ); // store full object
                    }}
                    className="flex-1"
                  >
                    <SelectTrigger
                      variant="outline"
                      size="sm"
                      className="flex-1 justify-between h-11"
                    >
                      <SelectInput
                        placeholder={label}
                        value={paymentRow ? paymentRow.name : "error"}
                        className="text-base text-text h-12"
                      />
                      <SelectIcon
                        as={AntDesign}
                        name="down"
                        className="mr-3 text-text"
                      />
                    </SelectTrigger>

                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>

                        {paymentMethods.map((method) => (
                          <SelectItem
                            key={method.id}
                            value={method}
                            label={method.name}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </View>
              </View>
            )}
          </Animated.View>
        </CollapsibleSection>
      </View>
    </ScrollView>
  );
}
