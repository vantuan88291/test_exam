import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./stacks/root";
import { navigationRef } from "@utils";

export function RootNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
}
