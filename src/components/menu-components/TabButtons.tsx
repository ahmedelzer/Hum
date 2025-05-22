import React from "react";
import { View, ScrollView, Dimensions, I18nManager } from "react-native";
import { Pressable, Text } from "../../../components/ui";
import { Flow } from "react-native-animated-spinkit";
import LoadingScreen from "../../kitchensink-components/loading/LoadingScreen";
import { theme } from "../../Theme";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedTab } from "../../reducers/LocationReducer";

export const TabButtons = ({ rows = [], loading }: any) => {
  const selectedTab = useSelector((state) => state.location.selectedTab);
  const dispatch = useDispatch();
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 4,
          alignItems: "center",
          width: "100%",
        }}
      >
        {rows.map((tab: any, index: number) => {
          const isSelected = selectedTab === index;
          return (
            <Pressable
              key={index}
              onPress={() => dispatch(updateSelectedTab(index))}
              style={{
                paddingVertical: 14,
                // paddingHorizontal: 16,
                // marginHorizontal: 4,
                width: `${100 / rows.length}%`,
              }}
              className={`${isSelected ? "!bg-accent" : "bg-primary-custom"} rounded-lg text-center !text-body text-xl`}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
                className="text-body"
              >
                {tab}
              </Text>
            </Pressable>
          );
        })}

        {loading && (
          <View style={{ paddingHorizontal: 16 }}>
            <LoadingScreen
              LoadingComponent={<Flow size={30} color="#6200ee" />}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
