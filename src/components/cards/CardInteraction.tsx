import React, { useState, useRef, useEffect } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { HStack } from "../../../components/ui";
import GetIconMenuItem from "../../utils/component/GetIconMenuItem";
import { RunsSpacialAction } from "../../utils/operation/RunsSpacialAction";
import NodeMenuItemsSchemaActions from "../../Schemas/MenuSchema/NodeMenuItemsSchemaActions.json";
import { theme } from "../../Theme";

export default function CardInteraction({ item, fieldsType }) {

  const [active, setActive] = useState(item[fieldsType.indexOfInteraction]??0); // 1: like, -1: dislike, 0: none
 useEffect(() => {
    setActive(item[fieldsType.indexOfInteraction] ?? 0);
  }, [item[fieldsType.indexOfInteraction]]);
  // const likeAnim = useRef(
  //   new Animated.Value(item[fieldsType.indexOfInteraction] === 1 ? 1 : 0)
  // ).current;
  // const dislikeAnim = useRef(
  //   new Animated.Value(item[fieldsType.indexOfInteraction] === -1 ? 1 : 0)
  // ).current;

 // Re-initialize animations when active state changes
  const likeAnim = useRef(new Animated.Value(0)).current;
  const dislikeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset animations based on current active state
    likeAnim.setValue(active === 1 ? 1 : 0);
    dislikeAnim.setValue(active === -1 ? 1 : 0);

    Animated.parallel([
      Animated.timing(likeAnim, {
        toValue: active === 1 ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(dislikeAnim, {
        toValue: active === -1 ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [active, likeAnim, dislikeAnim]);

  const likeBackground = likeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,0,0,0)", theme.accent], // Changed from "transparent"
  });

  const dislikeBackground = dislikeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,0,0,0)", theme.accent], // Changed from "transparent"
  });

  const handlePress = async (type, field) => {
    const newIndex =
      type === "like" ? (active === 1 ? 0 : 1) : active === -1 ? 0 : -1;

    const req = await RunsSpacialAction(
      field,
      item[fieldsType.idField],
      newIndex !== 0,
      NodeMenuItemsSchemaActions
    );
    
    if (req) {
      setActive(newIndex);
    }
  };

  return (
    <HStack
      space="lg"
      className="items-center w-full gap-0"
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: scale(28),
      }}// Simplified key
    >
      {/* LIKE */}
      <TouchableOpacity
        onPress={() => handlePress("like", fieldsType.likes)}
        key={`${fieldsType.likes}-btn`} // Simplified key
        activeOpacity={0.8}
        style={{
          flex: 1,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: likeBackground,
            justifyContent: "center",
            alignItems: "center",
            opacity: 1, // Explicitly set
            borderWidth: 0, // Explicitly set
          }}
        >
          <GetIconMenuItem
            key={`${item[fieldsType.idField]}-happy-${item[fieldsType.indexOfInteraction]}`} // Removed active from key
            count={item[fieldsType.likes]}
            iconName="happy"
            size={18}
            style={{ 
              color: active == 1 ? theme.text : theme.text,
              backgroundColor: 'transparent' // Ensure icon bg is transparent
            }}
          />
        </Animated.View>
      </TouchableOpacity>

      {/* SPACER */}
      <Animated.View
        style={{
          width: scale(1),
          height: "100%",
          backgroundColor: theme.body,
          borderRadius: 1,
        }}
      />

      {/* DISLIKE */}
      <TouchableOpacity
        onPress={() => handlePress("dislike", fieldsType.dislikes)}
        activeOpacity={0.8}
        key={`${fieldsType.dislikes}-btn`} // Added consistent key
        style={{
          flex: 1,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: dislikeBackground,
            justifyContent: "center",
            alignItems: "center",
            opacity: 1, // Explicitly set
            borderWidth: 0, // Explicitly set
          }}
        >
          <GetIconMenuItem
            key={`${item[fieldsType.idField]}-normal-${item[fieldsType.indexOfInteraction]}`} // Removed active from key
            count={item[fieldsType.dislikes]}
            iconName="normal"
            size={18}
            style={{ 
              color: active == -1 ? theme.card : theme.text,
              backgroundColor: 'transparent' // Ensure icon bg is transparent
            }}
          />
        </Animated.View>
      </TouchableOpacity>
    </HStack>
  );
}
