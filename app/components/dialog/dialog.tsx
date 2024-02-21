import React, { memo } from "react";
import { ViewStyle } from "react-native";
import Modal from "react-native-modal";

export interface DialogProps {
  visible?: boolean;
  position?: "center" | "bottom";
  direction?: "up" | "down";
  onClose?(): void;
  children?: React.ReactNode;
}

export const Dialog = memo(function Dialog(props: DialogProps) {
  const { visible, position, children, direction, onClose, ...rest } = props;

  const getPosition = () => {
    if (!position || position === "center") {
      return "center";
    } else {
      return "flex-end";
    }
  };

  const $style: ViewStyle = {
    justifyContent: getPosition(),
    margin: 0,
  };

  return (
    <Modal
      {...rest}
      style={$style}
      isVisible={visible}
      useNativeDriver={true}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      swipeDirection={direction}
      backdropOpacity={0.5}
      hideModalContentWhileAnimating={true}
    >
      {children}
    </Modal>
  );
});
