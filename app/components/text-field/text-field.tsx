import React, { memo } from "react";
import {
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { fonts } from "@assets";
import { colors, commonStyle } from "@themes";
import { Row } from "../row/row";
import { Text } from "../text/text";
import { Button } from "../button/button";
import { Icon } from "../icon/icon";

export interface TextFieldProps extends TextInputProps {
  placeholder?: string;
  label?: string;
  size?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  forwardedRef?: any;
  required?: boolean;
  labelStyle?: ViewStyle;
  secureTextEntry?: boolean;
  iconColor?: string;
  onChangeText: (text: string) => void;
}

export const TextField = memo(function TextField(props: TextFieldProps) {
  const {
    style: styleOverride,
    inputStyle: inputStyleOverride,
    placeholder,
    label,
    labelStyle: labelStyleOverride,
    size,
    required,
    forwardedRef,
    secureTextEntry,
    iconColor,
    onChangeText,
    ...rest
  } = props;

  const [pass, showPass] = React.useState(secureTextEntry);

  const setShowPass = () => {
    showPass((data) => !data);
  };

  const containerStyle: ViewStyle = { ...$container, ...styleOverride };

  const inputStyle: TextStyle = { ...$input, ...inputStyleOverride };

  const labelStyle: ViewStyle = { ...$label, ...labelStyleOverride };

  const onChangeInputText = React.useCallback((text: string) => {
    onChangeText(text);
  }, []);

  return (
    <View style={containerStyle}>
      {label && (
        <Row style={labelStyle}>
          <Text text={label} size={size ?? 15} />
          {required && <Text color={colors.red} text={"*"} />}
        </Row>
      )}
      <Row style={$rowInput}>
        <TextInput
          style={inputStyle}
          ref={forwardedRef}
          underlineColorAndroid={colors.transparent}
          placeholder={placeholder}
          onChangeText={onChangeInputText}
          placeholderTextColor={colors.darkGray}
          secureTextEntry={pass}
          autoCorrect={false}
          allowFontScaling={false}
          {...rest}
        />
        {secureTextEntry && (
          <Button style={$button} onPress={setShowPass}>
            <Icon
              size={18}
              icon={pass ? "eye" : "hide"}
              color={iconColor || colors.black}
            />
          </Button>
        )}
      </Row>
    </View>
  );
});

const $container: ViewStyle = {
  paddingVertical: 5,
  height: 70,
  width: "100%",
};

const $rowInput: ViewStyle = {
  ...commonStyle.flex,
  borderWidth: 1,
  borderColor: colors.darkGray,
  height: "100%",
  borderRadius: 8,
  minHeight: 44,
};

const $input: TextStyle = {
  ...commonStyle.flex,
  color: colors.black,
  minHeight: 44,
  fontSize: 14,
  fontFamily: fonts.medium,
  paddingHorizontal: 8,
};

const $label: ViewStyle = {
  marginBottom: 8,
};

const $button: ViewStyle = {
  paddingHorizontal: 5,
  backgroundColor: colors.white,
  paddingVertical: 10,
};
