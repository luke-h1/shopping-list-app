import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { useColorScheme } from "@/hooks/useColorScheme";
import { tokenCache } from "@/cache";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <ClerkLoaded>
          <Slot />
          <StatusBar style="auto" />
        </ClerkLoaded>
      </ClerkProvider>
    </ThemeProvider>
  );
}
