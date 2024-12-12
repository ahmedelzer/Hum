import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { WindowWidth } from "../shared";

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Notification {
  message: string;
  seen: boolean;
}

const data: Notification[] = [
  { message: "Short leave request approved", seen: false },
  { message: "Short leave request approved", seen: false },
  { message: "Short leave request approved", seen: false },
  { message: "Short leave request approved", seen: false },
  { message: "Short leave request approved", seen: true },
  { message: "Short leave request approved", seen: true },
  { message: "Short leave request approved", seen: true },
];

const width = Dimensions.get("window");
const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={styles.modalContainerWrapper}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Notifications</Text>
              <TouchableOpacity onPress={() => console.log("Mark all as read")}>
                <Text style={styles.markAllAsReadText}>Mark All As Read</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                rowGap: 5,
              }}
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => console.log("Notification pressed")}
                  style={[
                    styles.flatListContent,
                    item.seen && styles.seenNotification,
                  ]}
                  disabled={item.seen}
                >
                  <Text style={styles.notificationText}>{item.message}</Text>
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 90, // Adjust this value based on your header height
    paddingHorizontal: 16, // Adjust this value based on your header padding
  },
  modalContainerWrapper: {
    width: "100%",
    alignItems: "flex-end",
  },
  modalContainer: {
    rowGap: 8,
    width: WindowWidth / 1.5, // Adjust the width as needed
    backgroundColor: "#FFFFFF", // theme.colors.white
    borderRadius: 10,
    padding: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium", // fonts.PoppinsMedium
    color: "#6B7280", // theme.colors.gray500
  },
  markAllAsReadText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium", // fonts.PoppinsMedium
    color: "#3B82F6", // theme.colors.blue
  },
  flatListContent: {
    padding: 8,
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: "#F3F4F6", // theme.colors.backgroundColor
    alignItems: "center",
    justifyContent: "flex-start",
  },
  seenNotification: {
    opacity: 0.3,
  },
  notificationText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular", // fonts.PoppinsRegular
    color: "#1F2937", // theme.colors.gray900
  },
});

export default NotificationModal;
