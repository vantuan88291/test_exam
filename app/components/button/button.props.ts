import { FontsTypes } from "@assets";
import {
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedbackProps,
} from "react-native";

export const scales = {
  small: 0.98,
  large: 0.9,
  none: 1,
};

type ScaleType = keyof typeof scales;

export interface ButtonProps extends TouchableWithoutFeedbackProps {
  text?: string;
  font?: FontsTypes;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  children?: React.ReactNode | React.ReactNode[];
  textColor?: string;
  iconColor?: string;
  loading?: boolean;
  size?: number;
  scale?: ScaleType;
  loadingColor?: string;
}
