import "react-native-gesture-handler";
import React, { useCallback } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ReduxProvider } from "@redux";
import { RootNavigation } from "@navigation";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { fonts } from "@assets";
import { commonStyle } from "@themes";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    [fonts.huge]: require("./app/assets/fonts/Montserrat-Black.ttf"),
    [fonts.bold]: require("./app/assets/fonts/Montserrat-Bold.ttf"),
    [fonts.italic]: require("./app/assets/fonts/Montserrat-Italic.ttf"),
    [fonts.medium]: require("./app/assets/fonts/Montserrat-Medium.ttf"),
    [fonts.semiBold]: require("./app/assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <SafeAreaView style={commonStyle.flex}>
        <ReduxProvider>
          <RootNavigation />
        </ReduxProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
