import { ImageStyle, ViewStyle } from "react-native";
import { IconTypes } from "@assets";

export interface IconProps {
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  icon?: IconTypes;
  size?: number;
  color?: string;
}
