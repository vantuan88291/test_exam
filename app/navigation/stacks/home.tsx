import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "@screens";
import { SCREEN_OPTIONS, SCREENS } from "@utils";

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name={SCREENS.home} component={HomeScreen} />
    </Stack.Navigator>
  );
}
