import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { Video } from "expo-av";
import img from "../assets/logo.jpg";
import V from "../assets/VID_20240109_061602_248.mp4";
import Carousel from "react-native-snap-carousel";
import { MaterialIcons } from "@expo/vector-icons";

var { width, height } = Dimensions.get("window");
const Add = () => {
  const data = [1, 2, 3];

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    // <View style={styles.container}>
    //   <Carousel
    //     data={data}
    //     renderItem={() => <Companes />}
    //     firstItem={1}
    //     // loop={true}
    //     // inactiveSlideScale={0.86}
    //     inactiveSlideOpacity={0.6}
    //     sliderWidth={width}
    //     itemWidth={width * 0.62}
    //     slideStyle={{ display: "flex", alignItems: "center" }}
    //   />

    //   <View style={styles.controls}>
    //     <Button
    //       title={isPlaying ? "Pause" : "Play"}
    //       onPress={togglePlayPause}
    //     />
    //   </View>
    // </View>
    <View>
      <Stories />
    </View>
  );
};
const Stories = () => {
  const [story, setStory] = useState(true);
  const [visable, setvisable] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleVideoPress = (e) => {
    setvisable(true);
    setStory(V);
  };
  const videoRef = useRef(null);
  useEffect(() => {
    // Start video playback after it has loaded
    if (videoRef.current) {
      videoRef.current.playAsync();
      // Pause and restart the video after 5 seconds
      setTimeout(async () => {
        if (videoRef.current) {
          await videoRef.current.pauseAsync();
          await videoRef.current.replayAsync();
        }
      }, 5000);
    }
  }, [isPlaying]);
  console.log("====================================");
  console.log(visable);
  console.log("====================================");
  return (
    <>
      <ScrollView
        horizontal={true}
        pagingEnabled
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(contentOffsetX / 300); // Assuming each story card is 300 width
        }}
      >
        <View style={styles.card} onPress={console.log(12)}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={handleVideoPress}
          >
            <Video
              ref={videoRef}
              source={V} // Replace with your video URL
              // style={styles.video}
              useNativeControls={false}
              className=" w-full !h-[100%]"
              resizeMode="contain"
              isLooping // Loop the video
              shouldPlay={isPlaying} // Start or stop playing based on 'isPlaying' state
            />
            {/* {isPlaying ? (
              <View style={styles.playPauseButton}>
                <MaterialIcons name="pause" size={24} color="white" />
              </View>
            ) : (
              <View style={styles.playPauseButton}>
                <MaterialIcons name="play-arrow" size={24} color="white" />
              </View>
            )} */}
          </TouchableOpacity>
        </View>
      </ScrollView>
      {visable ? <Story visable={visable} story={story} /> : <></>}
    </>
  );
};
const Story = ({ visable, story }) => {
  const [current, setcurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const [content, setcontent] = useState([
    {
      content: require("../assets/logo.jpg"),
      type: "image",
      finsh: 0,
    },
    {
      content: require("../assets/logo.jpg"),
      type: "image",
      finsh: 0,
    },
    {
      content: require("../assets/logo.jpg"),
      type: "image",
      finsh: 0,
    },
  ]);
  const videoRef = useRef(null);
  console.log("====================================");
  console.log(123);
  console.log("====================================");

  return (
    <Modal visible={visable}>
      <Video
        ref={videoRef}
        source={V} // Replace with your video URL
        // style={styles.video}
        useNativeControls={false}
        className=" w-full !h-[100%]"
        resizeMode="contain"
        isLooping // Loop the video
        shouldPlay={isPlaying} // Start or stop playing based on 'isPlaying' state
      />
    </Modal>

    // <View className=" flex-1 bg-[#000]">
    //   <Text>dasa</Text>
    //   {content.type === "image" ? (
    //     <Image
    //       source={content[current].content}
    //       style={{ width: width, height: height, resizeMode: "cover" }}
    //     />
    //   ) : (
    //     <Video
    //       ref={videoRef}
    //       source={V} // Replace with your video URL
    //       style={styles.video}
    //       useNativeControls={true}
    //       resizeMode="contain"
    //     />
    //   )}
    //   <View
    //     className="absolute top-0 flex-row justify-between"
    //     style={{ width: width, height: height }}
    //   >
    //     <TouchableOpacity
    //       className="w-[30%] h-full"
    //       onPress={() => {
    //         if (current > 0) {
    //           setcurrent(current - 1);
    //         }
    //       }}
    //     >
    //       <View></View>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       className="w-[30%] h-full"
    //       onPress={() => {
    //         if (current > 0) {
    //           setcurrent(current + 1);
    //         }
    //       }}
    //     >
    //       <View></View>
    //     </TouchableOpacity>
    //   </View>
    // </View>
  );
};

const Companes = () => {
  const videoRef = useRef(null);

  return (
    <TouchableWithoutFeedback>
      <Video
        ref={videoRef}
        source={V} // Replace with your video URL
        style={styles.video}
        useNativeControls={true}
        resizeMode="contain"
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    marginTop: 20,
  },
  scrollView: {
    alignSelf: "stretch",
  },
  contentContainer: {
    alignItems: "center",
  },
  card: {
    width: 120,
    height: 200,
    backgroundColor: "#ebebeb",
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  user: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  video: {
    width: 120,
    height: 700,
  },
  playPauseButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Add;
