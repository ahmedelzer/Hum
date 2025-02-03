import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import GoBackHeader from "../header/GoBackHeader";
import { CarouselBox } from "../cards/CarouselBox";
import { SetResponsiveContainer } from "../../utils/SetResponsiveContainer";
import ResponsiveContainer from "../../kitchensink-components/auth/layout/ResponsiveContainer";
const DetailsScreen = ({ route }) => {
  const item = route.params;
  const [likes, setLikes] = useState(4);
  return (
    <ResponsiveContainer setMargin={true} style={""}>
      <SafeAreaView className="bg-body">
        <GoBackHeader subTitle={""} title={"Details"} />
        <CarouselBox actions={{ likes, setLikes }} {...item} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View className="justify-center items-center h-[250px]">
          <Image source={item.image} style={{ height: 220, width: 220 }} />
        </View>
        <View style={style.details} className="bg-card">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text className="font-semibold text-lg text-primary-custom">
              {item.name}
            </Text>
            <View style={style.iconContainer}>
              <Icon name="favorite-border" color={COLORS.primary} size={25} />
            </View>
          </View>
          <Text style={style.detailsText}>{item.description}</Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton title="Add To Cart" />
          </View>
        </View> */}
        </ScrollView>
      </SafeAreaView>
    </ResponsiveContainer>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    // backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    // color: COLORS.white,
  },
});

export default DetailsScreen;
