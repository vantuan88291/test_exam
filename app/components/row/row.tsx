import * as React from "react";
import { View, ViewStyle } from "react-native";

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
};

export interface RowProps {
  style?: ViewStyle;
  children: React.ReactNode | React.ReactNode[];
}

export function Row(props: RowProps) {
  const { style: styleOverride, children, ...rest } = props;

  return (
    <View style={[CONTAINER, styleOverride]} {...rest}>
      {children}
    </View>
  );
}
