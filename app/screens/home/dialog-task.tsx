import React, { memo } from "react";
import { TextInput, View, ViewStyle } from "react-native";
import { Button, Dialog, Text } from "@components";
import { colors } from "@themes";

interface DialogTaskProps {
  mode: "create" | "update";
  visible: boolean;
  onClose: () => void;
  valueTitle: string;
  onChangeTitle: (text: string) => void;
  valueDescription: string;
  onChangeDescription: (text: string) => void;
  onAddTask: () => void;
}

export const DialogTask = memo((props: DialogTaskProps) => {
  const {
    mode = "create",
    visible,
    onClose,
    valueTitle,
    onChangeTitle,
    valueDescription,
    onChangeDescription,
    onAddTask,
  } = props;

  return (
    <Dialog position="bottom" visible={visible} onClose={onClose}>
      <View style={$container}>
        <Text size={15}>
          Title
          <Text color={colors.red} text={"*"} />
        </Text>
        <TextInput
          style={$inputTitle}
          value={valueTitle}
          onChangeText={onChangeTitle}
        />
        <Text style={$txDescription} text="Description" />
        <TextInput
          style={$inputDescription}
          multiline
          numberOfLines={5}
          value={valueDescription}
          onChangeText={onChangeDescription}
        />
        <Button
          style={$btnAct}
          text={mode === "create" ? "Add new task" : "Update task"}
          onPress={onAddTask}
        />
      </View>
    </Dialog>
  );
});

const $container: ViewStyle = {
  backgroundColor: colors.white,
  padding: 8,
  paddingVertical: 16,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
};

const $inputTitle: ViewStyle = {
  height: 32,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: colors.darkGray,
  marginTop: 4,
  paddingHorizontal: 8,
};

const $txDescription: ViewStyle = { marginTop: 8 };

const $inputDescription: ViewStyle = {
  height: 96,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: colors.darkGray,
  marginTop: 4,
  paddingHorizontal: 8,
};

const $btnAct: ViewStyle = {
  width: 170,
  paddingVertical: 12,
  alignItems: "center",
  alignSelf: "center",
  marginTop: 16,
};
