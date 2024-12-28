import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";

import { HStack } from "../../../components/ui";
import NotificationModal from "./NotificationModal";
import { Bell, ChevronLeft } from "lucide-react-native";

interface CustomHeaderProps {
  title?: string;
  subTitle?: string;
  backPress?: () => void;
  isBackIcon?: boolean;
  isProfileImage?: boolean;
}

const Header: React.FC<CustomHeaderProps> = ({
  title,
  subTitle,
  backPress,
  isBackIcon = true,
  isProfileImage = false,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <HStack style={styles.container}>
      <Text>header</Text>
      {isProfileImage ? (
        <HStack style={styles.startRow}>
          <Image
            source={require("../../../assets/display/image1.png")}
            style={styles.profileImage}
          />
          <View style={styles.startRowText}>
            <Text style={styles.profileName}>Mustafa Zeb</Text>
            <Text style={styles.profileTitle}>SR. Mobile Developer</Text>
          </View>
        </HStack>
      ) : (
        <HStack style={{ alignItems: "flex-start" }}>
          {/* {isBackIcon && ( */}
          <TouchableOpacity onPress={backPress}>
            <ChevronLeft size={18} />
          </TouchableOpacity>
          {/* )} */}
          <View style={{ marginHorizontal: 8 }}>
            {title && <Text style={styles.title}>{title}</Text>}
            {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
          </View>
        </HStack>
      )}
      <TouchableOpacity onPress={toggleModal}>
        <Bell size={20} style={styles.bellIcon} />
      </TouchableOpacity>
      <NotificationModal visible={isModalVisible} onClose={toggleModal} />
    </HStack>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  startRowText: {
    justifyContent: "center",
  },
  startRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 24,
  },
  profileName: {
    color: "#000000", // theme.colors.black
    fontFamily: "Poppins-SemiBold", // fonts.PoppinsSemiBold
    fontSize: 16,
  },
  profileTitle: {
    fontFamily: "Poppins-Regular", // fonts.PoppinsRegular
    fontSize: 12,
    color: "#9CA3AF", // theme.colors.gray400
  },
  title: {
    color: "#1F2937", // theme.colors.gray950
    fontFamily: "Poppins-Regular", // fonts.PoppinsRegular
    fontSize: 16,
  },
  subTitle: {
    color: "#6B7280", // theme.colors.gray500
    fontFamily: "Poppins-Regular", // fonts.PoppinsRegular
    fontSize: 12,
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
});
