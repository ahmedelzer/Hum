import { useContext, useEffect, useLayoutEffect } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GlobalContext } from "../context";
import Messagecomponent from "../components/Messagecomponent";
import { socket } from "../utils/index";

export default function Messagescreen({ navigation, route }) {
  const { currentGroupName, currentGroupID } = route.params;
  const {
    allChatMessages,
    setAllChatMessages,
    currentUser,
    currentChatMesage,
    setCurrentChatMessage,
  } = useContext(GlobalContext);

  function handleAddNewMessage() {
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    };

    if (currentUser) {
      socket.emit("newChatMessage", {
        currentChatMesage,
        groupIdentifier: currentGroupID,
        currentUser,
        timeData,
      });

      setCurrentChatMessage("");
      Keyboard.dismiss();
    }
  }

  useEffect(() => {
    socket.emit("findGroup", currentGroupID);
    socket.on("foundGroup", (allChats) => setAllChatMessages(allChats));
  }, [socket]);
  const data = [
    { id: "1", source: require("../assets/logo.jpg") },
    { id: "2", source: require("../assets/logo.jpg") },
    { id: "3", source: require("../assets/logo.jpg") },
    { id: "4", source: require("../assets/logo.jpg") },
    { id: "5", source: require("../assets/logo.jpg") },
    { id: "6", source: require("../assets/logo.jpg") },
  ];

  const renderItem = ({ item }) => (
    <Image source={item.source} style={{ width: 100, height: 100 }} />
  );
  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.wrapper, { paddingVertical: 15, paddingHorizontal: 10 }]}
      >
        {allChatMessages && allChatMessages[0] ? (
          <FlatList
            data={allChatMessages}
            renderItem={({ item }) => (
              <Messagecomponent item={item} currentUser={currentUser} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>
      <View className="mx-2 flex flex-row justify-evenly mb-1">
        <FlatList
          data={data}
          className="h-[100]"
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={() => (
          //   <View>
          //     <Text style={{ color: "#000" }}>Header</Text>
          //   </View>
          // )}
        />
        <FlatList
          data={data}
          className="w-[150] h-[100]"
          renderItem={() => (
            <View style={styles.container}>
              <View className=" bg-black absolute " style={styles.half}></View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          horizontal={true}
        />
      </View>
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          value={currentChatMesage}
          onChangeText={(value) => setCurrentChatMessage(value)}
          placeholder="Enter your message"
        />
        <Pressable onPress={handleAddNewMessage} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#eee",
  },
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  half: {
    borderBottomLeftRadius: 100, // Adjusted border radius
    borderTopLeftRadius: 100,
    width: 50,
    height: 100,
    top: 0,
    left: 0,
  },
  messageInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messageInput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  button: {
    width: "30%",
    backgroundColor: "#703efe",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
