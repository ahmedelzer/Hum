import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import COLORS from "../context/colors";
import Button from "../components/Button";
import Checkbox from "expo-checkbox";
import inputData from "../components/Data.json"; // Assuming inputData.json is in the same directory
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

const Signup = ({ navigation }) => {
  const [info, setInfo] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [numberPrefix, setNumberPrefix] = useState("+91");
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(Platform.OS === "ios");
    setBirthday(currentDate);
    setInfo({
      ...info,
      birthdate: currentDate,
    });
  };
  const handleChange = (value, fieldName) => {
    setInfo({
      ...info,
      [fieldName]: value,
    });
  };
  console.log(info);
  const renderInputField = (input) => {
    return (
      <View key={input.fieldName} style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
          }}
        >
          {input.title}
        </Text>
        {input.type === "text" || input.type === "email" ? (
          <TextInput
            placeholder={input.placeholder}
            onChangeText={(value) => handleChange(value, input.fieldName)}
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 8,
              height: 40,
              paddingLeft: 10,
            }}
          />
        ) : input.type === "date" ? (
          <>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="Select your Birthday"
                placeholderTextColor="black"
                value={birthday.toDateString()} // Display selected date as string
                editable={false} // Make the text input read-only
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 8,
                  height: 40,
                  paddingLeft: 10,
                  flex: 1,
                }}
              />
              <Button
                title="Select"
                className="ml-2 h-4"
                onPress={() => setShowDatePicker(true)}
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 8,
                  height: 40,
                  paddingLeft: 10,
                  // flex: 1,
                }}
              />
            </View>
            {showDatePicker && (
              <RNDateTimePicker
                value={birthday}
                onChange={handleDateChange}
                dateFormat="day month year"
              />
            )}
          </>
        ) : input.type === "radio" ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {input.options.map((option) => (
              <TouchableOpacity
                key={option.name}
                onPress={() => handleChange(option.value, input.fieldName)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <View
                  style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: COLORS.black,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {info[input.fieldName] === option.value && (
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: COLORS.black,
                      }}
                    />
                  )}
                </View>
                <Text style={{ marginLeft: 8 }}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : input.type === "tel" ? (
          <View>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="+91"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "12%",
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.grey,
                  height: "100%",
                }}
                onChangeText={(value) => setNumberPrefix(value)}
              />

              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "80%",
                }}
                onChangeText={(text) =>
                  handleChange(numberPrefix + text, "phoneNumber")
                }
              />
            </View>
          </View>
        ) : input.type === "password" ? (
          <View style={{ marginBottom: 12 }}>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                }}
                onChangeText={(text) => handleChange(text, input.fieldName)}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isPasswordShown ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.black,
              }}
            >
              Create Account
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              Connect with your friend today!
            </Text>
          </View>

          {inputData.map((input) => renderInputField(input))}

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
            }}
          >
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />

            <Text>I agree to the terms and conditions</Text>
          </View>

          <Button
            title="Sign Up"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
            <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.grey,
                marginRight: 4,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("../assets/facebook.png")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8,
                }}
                resizeMode="contain"
              />

              <Text>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.grey,
                marginRight: 4,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("../assets/google.png")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8,
                }}
                resizeMode="contain"
              />

              <Text>Google</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Already have an account
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Signup;
