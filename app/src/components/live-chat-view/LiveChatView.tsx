import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  InputField,
  PaperclipIcon,
  CircleIcon,
  ButtonIcon,
  Icon,
  Divider,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "../../../components/ui";
import * as ImagePicker from "expo-image-picker";
import { Mail, MenuIcon } from "lucide-react-native";
import MenuView from "../menu-components/MenuView";

// Import necessary libraries for voice recording

const LiveChatView = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello!", sender: "receiver" },
    { id: "2", text: "Hi there!", sender: "sender" },
  ]);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (text.trim()) {
      setMessages([
        { id: Date.now().toString(), text, sender: "sender" },
        ...messages,
      ]);
      setText("");
    }
  };

  const handleStartRecording = () => {
    // Start voice recording
    setIsRecording(true);
    console.log("Recording started");
  };

  const handleStopRecording = () => {
    // Stop voice recording
    setIsRecording(false);
    console.log("Recording stopped");
  };

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const renderItem = ({ item }: any) => (
    <Box
      style={[
        styles.messageContainer,
        item.sender === "receiver" ? styles.sender : styles.receiver,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </Box>
  );

  const menuDetails = {
    attributes: {
      status: "collecting",
      user_image_url: null,
      first_name: "Food",
      last_name: "Foods",
    },
  };

  return (
    <VStack className="mx-4 flex-1">
      <TouchableOpacity
        onPress={() => setShowActionsheet(true)}
        className="bg-white mt-4 px-4 py-1 rounded-full ">
        <HStack className="items-center justify-between">
          <VStack className="ml-4">
            <Text className="text-base font-semibold">
              {menuDetails.attributes.first_name}{" "}
              {menuDetails.attributes.last_name}
            </Text>
            <Text className="text-sm text-green-600">
              {menuDetails.attributes.status}
            </Text>
          </VStack>
          <Icon as={MenuIcon} size="xl" color="#25A4EB" />
        </HStack>
      </TouchableOpacity>

      <Actionsheet
        snapPoints={[90]}
        isOpen={showActionsheet}
        onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent
          style={{
            margin: 0,
            padding: 0,
          }}>
          <ActionsheetDragIndicatorWrapper
            style={{
              zIndex: 1,
            }}>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <MenuView />
        </ActionsheetContent>
      </Actionsheet>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        inverted
      />
      <HStack space="xs" className="bg-white p-4 rounded-lg">
        <Button
          variant="link"
          onPress={pickImage}
          size="lg"
          className="rounded-full m-0 p-0">
          <ButtonIcon as={PaperclipIcon} />
        </Button>
        <Button variant="link" size="lg" className="rounded-full p-0 m-0 ">
          <ButtonIcon as={CircleIcon} />
        </Button>
        <Divider orientation="vertical" className="h-10 ml-1" />
        <Input variant="rounded" className="flex-1 border-transparent">
          <InputField
            value={text}
            onChangeText={setText}
            placeholder="Type a message"
          />
        </Input>
        <Button
          variant="solid"
          className="bg-blue-700 rounded-full"
          onPress={handleSend}>
          <Text className="color-white font-semibold">Send</Text>
        </Button>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  sender: {
    alignSelf: "flex-start",
    backgroundColor: "#dcf8c6",
  },
  receiver: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },

  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
  },
});

export default LiveChatView;
