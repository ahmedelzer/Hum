// import React from "react";
// import { useForm } from "react-hook-form";
// import { SafeAreaView, StyleSheet } from "react-native";
// import BranchesByLocationMap from "../components/maps/BranchesByLocationMap";

// const SettingsScreen = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const onSubmit = async (data: any) => {
//     console.log(data);
//   };
//   const branches = [
//     {
//       LocationLatitudePoint: "37.7749",
//       LocationLongitudePoint: "-122.4194",
//       name: "San Francisco",
//       description: "Main Branch",
//     },
//     {
//       LocationLatitudePoint: "34.0522",
//       LocationLongitudePoint: "-118.2437",
//       name: "Los Angeles",
//     },
//     {
//       LocationLatitudePoint: "40.7128",
//       LocationLongitudePoint: "-74.0060",
//       name: "New York City",
//       description: "East Coast Branch",
//     },
//   ];
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <BranchesByLocationMap branches={branches} />
//       {/* <LongPressExample /> */}
//     </SafeAreaView>
//   );
//   // return <LanguageSelector />;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 18,
//   },
// });

// export default SettingsScreen;
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button } from "react-native";
import AddCard from "../components/cards/AddCard";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function SettingsScreen() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.contentContainer}>
      {/* <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View> */}
      <AddCard
        source="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        mediaType="video"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
