import React, { memo } from "react";
import { View } from "react-native";
import { Button, Dialog, Icon, Text } from "@components";
import { TASK_PRIORITY } from "@utils";
import { colors, commonStyle } from "@themes";

interface DialogSetPriorityProps {
  visible: boolean;
  onClose: () => void;
  priority: TASK_PRIORITY;
  onSelectPriority: (priority: TASK_PRIORITY) => void;
}

export const DialogSetPriority = memo((props: DialogSetPriorityProps) => {
  const { visible, onClose, priority, onSelectPriority } = props;

  const renderField = (value: TASK_PRIORITY) => (
    <Button
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: "space-between",
        backgroundColor: colors.white,
      }}
      onPress={() => {
        onSelectPriority(value);
        onClose();
      }}
    >
      <Text text={value} />
      {value === priority && (
        <Icon size={20} color={colors.turquoise} icon="checkMark" />
      )}
    </Button>
  );

  const renderSeparator = () => <View style={commonStyle.separator} />;

  return (
    <Dialog position="bottom" visible={visible} onClose={onClose}>
      <View
        style={{
          backgroundColor: colors.white,
          padding: 8,
          paddingTop: 16,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Text size={16} font="semiBold" text="Select priority" />
        {renderField(TASK_PRIORITY.high)}
        {renderSeparator()}
        {renderField(TASK_PRIORITY.medium)}
        {renderSeparator()}
        {renderField(TASK_PRIORITY.low)}
      </View>
    </Dialog>
  );
});
