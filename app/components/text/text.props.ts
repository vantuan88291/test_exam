import { TextProps as RNTextProps, TextStyle } from "react-native";
import { colors } from "@themes";
import { FontsTypes, fonts } from "@assets";

interface TextPresetProps {
  [name: string]: TextStyle;
}

const BASE: TextStyle = {
  color: colors.black,
  fontFamily: fonts.medium,
  fontSize: 14,
};

export const presets: TextPresetProps = {
  default: BASE,
  link: {
    ...BASE,
    textDecorationLine: "underline",
    textDecorationColor: colors.lightBlue,
    color: colors.lightBlue,
  },
};

export type TextPresets = keyof typeof presets;

export interface TextProps extends RNTextProps {
  preset?: TextPresets;
  children?: React.ReactNode;
  text?: string;
  style?: TextStyle | TextStyle[];
  size?: number;
  color?: string;
  font?: FontsTypes;
}
