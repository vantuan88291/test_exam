import {
  CommonActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function resetStack(name: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name }],
      })
    );
  }
}
