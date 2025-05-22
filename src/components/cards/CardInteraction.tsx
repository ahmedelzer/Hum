import React, { useState, useRef, useEffect } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { HStack } from "../../../components/ui";
import GetIconMenuItem from "../../utils/component/GetIconMenuItem";
import { RunsSpacialAction } from "../../utils/operation/RunsSpacialAction";
import NodeMenuItemsSchemaActions from "../../Schemas/MenuSchema/NodeMenuItemsSchemaActions.json";
import { theme } from "../../Theme";

export default function CardInteraction({ item, fieldsType }) {
  const indexOfLike = item.indexOflike;
  const [active, setActive] = useState(indexOfLike); // 1: like, -1: dislike, 0: none

  const likeAnim = useRef(
    new Animated.Value(indexOfLike === 1 ? 1 : 0)
  ).current;
  const dislikeAnim = useRef(
    new Animated.Value(indexOfLike === -1 ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(likeAnim, {
      toValue: active === 1 ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(dislikeAnim, {
      toValue: active === -1 ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    // console.log(item[fieldsType.likes], Key, "CardInteraction");
  }, [active]);

  const likeBackground = likeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", theme.accent],
  });

  const dislikeBackground = dislikeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", theme.accent],
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
  console.log(item[fieldsType.likes], "likes");

  return (
    <HStack
      space="lg"
      className="items-center w-full gap-0"
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: scale(28),
      }}
      key={`${item[fieldsType.orders]}-${item[fieldsType.rate]}-${item[fieldsType.likes]}-${item[fieldsType.dislikes]}`}
    >
      {/* LIKE */}
      <TouchableOpacity
        onPress={() => handlePress("like", fieldsType.likes)}
        key={`${fieldsType.likes}-${item[fieldsType.likes]}`}
        activeOpacity={0.8}
        style={{
          flex: 1,
          borderRadius: 8,
          overflow: "hidden", // important for rounded animation clipping
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: likeBackground,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GetIconMenuItem
            count={item[fieldsType.likes]}
            iconName="happy"
            size={18}
            style={{ color: active == 1 ? theme.text : theme.text }}
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
        style={{
          flex: 1,
          borderRadius: 8,
          overflow: "hidden", // important for rounded animation clipping
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: dislikeBackground,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GetIconMenuItem
            count={item[fieldsType.dislikes]}
            iconName="normal"
            size={18}
            style={{ color: active == -1 ? theme.card : theme.text }}
          />
        </Animated.View>
      </TouchableOpacity>
    </HStack>
  );
}
