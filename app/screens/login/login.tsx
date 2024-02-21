import React from "react";
import { Alert, Image, ImageStyle } from "react-native";
import { Button, TextField } from "@components";
import { View, ViewStyle } from "react-native";
import { icons } from "@assets";
import { colors } from "@themes";
import {
  changePassword,
  changeUsername,
  setDataTask,
  useAppDispatch,
  useAppSelector,
  userSelector,
} from "@redux";
import {
  STACKS,
  getDataTaskByUsername,
  getStorageKey,
  resetStack,
  storeValueByKey,
} from "@utils";

export function LoginScreen() {
  const dispatch = useAppDispatch();
  const { username, password } = useAppSelector(userSelector);

  const handleChangeUsername = (text: string) => dispatch(changeUsername(text));
  const handleChangePassword = (text: string) => dispatch(changePassword(text));

  const handleLogin = () => {
    if (!username) {
      return Alert.alert("", "Username is required!");
    }
    if (!password) {
      return Alert.alert("", "Password is required!");
    }
    const hasUsername = getStorageKey(username);
    if (hasUsername) {
      dispatch(setDataTask(getDataTaskByUsername(username)));
    } else {
      storeValueByKey(username, JSON.stringify([]));
      dispatch(setDataTask([]));
    }
    resetStack(STACKS.authenticated);
    dispatch(changePassword(""));
  };

  return (
    <View style={$container}>
      <Image style={$appIcon} source={icons.appIcon} />
      <TextField
        testID="inp_username"
        style={$input}
        label="Username"
        placeholder="Enter your username"
        required
        value={username}
        onChangeText={handleChangeUsername}
        maxLength={16}
      />
      <TextField
        testID="inp_password"
        style={$input}
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        required
        value={password}
        onChangeText={handleChangePassword}
        maxLength={24}
      />
      <Button
        testID="btn_login"
        style={$btnLogin}
        text="Login"
        font="bold"
        onPress={handleLogin}
      />
    </View>
  );
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white,
  alignItems: "center",
  justifyContent: "center",
};

const $appIcon: ImageStyle = {
  height: 120,
  width: 120,
  borderRadius: 60,
  marginBottom: 24,
};

const $input: ViewStyle = {
  paddingHorizontal: 16,
  marginBottom: 16,
};

const $btnLogin: ViewStyle = {
  marginTop: 8,
  width: 160,
  alignItems: "center",
};
