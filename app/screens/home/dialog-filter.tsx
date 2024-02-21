import React, { memo } from "react";
import { Dialog } from "@components";
import { View } from "react-native";
import { colors } from "@themes";

interface DialogFilterProps {
  visible: boolean;
  onClose: () => void;
}

export const DialogFilter = memo((props: DialogFilterProps) => {
  const { visible, onClose } = props;

  return (
    <Dialog position="bottom" visible={visible} onClose={onClose}>
      <View
        style={{
          backgroundColor: colors.white,
          padding: 8,
          paddingVertical: 16,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      ></View>
    </Dialog>
  );
});
