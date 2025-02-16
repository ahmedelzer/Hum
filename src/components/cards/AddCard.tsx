import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useVideoPlayer, VideoView } from "expo-video";
import { Button } from "react-native";
import { useEvent } from "expo";

export default function AddCard({ source, mediaType = "image" }) {
  const [Video, setVideo] = useState(null);
  const isVideo = mediaType === "video";

  // Video Player Setup
  const player = isVideo
    ? useVideoPlayer(source, (player) => {
        player.loop = true;
        player.play();
      })
    : null;

  // const { isPlaying } = useEvent(player, "playingChange", {
  //   isPlaying: player.playing,
  // });
  return (
    <Animated.View style={styles.container}>
      {mediaType === "image" ? (
        <Animated.Image
          style={styles.media}
          source={source}
          resizeMode="cover"
        />
      ) : (
        // <>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  media: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  controlsContainer: {
    padding: 10,
  },
  video: {
    width: 350,
    height: 275,
  },
});
