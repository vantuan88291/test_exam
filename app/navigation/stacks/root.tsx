import { createStackNavigator } from "@react-navigation/stack";
import { SCREEN_OPTIONS, STACKS } from "@utils";
import { LoginStack } from "./login";
import { HomeStack } from "./home";
import { TRootStack } from "./types";

const Stack = createStackNavigator<TRootStack>();

export function RootStack() {
  const isLoggedIn = false;

  return (
    <Stack.Navigator
      initialRouteName={
        isLoggedIn ? STACKS.authenticated : STACKS.unauthenticated
      }
      screenOptions={SCREEN_OPTIONS}
    >
      <Stack.Screen name={STACKS.unauthenticated} component={LoginStack} />
      <Stack.Screen name={STACKS.authenticated} component={HomeStack} />
    </Stack.Navigator>
  );
}
