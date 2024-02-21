import React, { memo } from "react";
import {
  ActivityIndicator,
  Animated,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { Text } from "../text/text";
import { colors } from "@themes";
import { ButtonProps, scales } from "./button.props";

export const Button = memo((props: ButtonProps) => {
  const {
    text,
    font = "medium",
    style: styleOverride,
    textStyle,
    children,
    textColor,
    loading,
    size,
    scale = "small",
    loadingColor,
    ...rest
  } = props;

  const animation = new Animated.Value(0);

  const inputRange = [0, 1];

  const outputRange = [1, scales[scale ?? "large"]];

  const scaleType = animation.interpolate({ inputRange, outputRange });

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const viewStyle = {
    ...$button,
    ...styleOverride,
    transform: [
      {
        scale: scaleType,
      },
    ],
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={loading}
      {...rest}
    >
      <Animated.View style={viewStyle}>
        {loading ? (
          <ActivityIndicator color={loadingColor ?? colors.black} />
        ) : (
          children ?? (
            <Text
              style={textStyle}
              size={size ?? 14}
              color={textColor ?? colors.white}
              text={text}
              font={font}
            />
          )
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

const $button: ViewStyle = {
  backgroundColor: colors.turquoise,
  paddingVertical: 16,
  paddingHorizontal: 32,
  borderRadius: 32,
};
