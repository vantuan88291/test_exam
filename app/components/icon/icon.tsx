import React, { memo } from "react";
import { View, Image, ImageStyle } from "react-native";
import { icons } from "@assets";
import { IconProps } from "./icon.props";

const ROOT: ImageStyle = { resizeMode: "contain" };

export const Icon = memo((props: IconProps) => {
  const {
    style: styleOverride,
    icon = "close",
    containerStyle,
    size,
    color,
  } = props;

  const iconStyle = {
    ...ROOT,
    width: size,
    height: size,
  };
  const mergeStyle = size ? iconStyle : ROOT;
  const style: ImageStyle = { ...mergeStyle, ...styleOverride };
  const tinColor = { tintColor: color };

  return (
    <View style={containerStyle}>
      <Image style={[style, color != null && tinColor]} source={icons[icon]} />
    </View>
  );
});
