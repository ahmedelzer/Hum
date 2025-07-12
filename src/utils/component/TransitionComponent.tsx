// components/TransitionComponent.js
import React, { useEffect } from "react";
import { ViewStyle, StyleProp } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const animationVariants = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slideUp: {
    from: { opacity: 0, translateY: 30 },
    to: { opacity: 1, translateY: 0 },
  },
  slideDown: {
    from: { opacity: 0, translateY: -30 },
    to: { opacity: 1, translateY: 0 },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
  },
};

const TransitionComponent = ({
  children,
  animation = "fadeIn",
  duration = 400,
  delay = 0,
  style = {},
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const variant = animationVariants[animation] || animationVariants.fadeIn;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if ("opacity" in variant.to)
        opacity.value = withTiming(variant.to.opacity, {
          duration,
          easing: Easing.out(Easing.ease),
        });
      if ("translateY" in variant.to)
        translateY.value = withTiming(variant.to.translateY, {
          duration,
          easing: Easing.out(Easing.ease),
        });
      if ("scale" in variant.to)
        scale.value = withTiming(variant.to.scale, {
          duration,
          easing: Easing.out(Easing.ease),
        });
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      "translateY" in variant.to ? { translateY: translateY.value } : {},
      "scale" in variant.to ? { scale: scale.value } : {},
    ],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
};

export default TransitionComponent;
