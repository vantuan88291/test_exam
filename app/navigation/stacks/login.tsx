import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "@screens";
import { SCREEN_OPTIONS, SCREENS } from "@utils";

const Stack = createStackNavigator();

export function LoginStack() {
  return (
    <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name={SCREENS.login} component={LoginScreen} />
    </Stack.Navigator>
  );
}
