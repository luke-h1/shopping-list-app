import { Button } from "@/components/ui/Button";
import { ListContextProvider } from "@/context/ListContext";
import ShoppingListsStore from "@/store/ShoppingListsStore";
import ShoppingListStore from "@/store/ShoppingListStore";
import { router, Stack } from "expo-router";
import { Provider as TinyBaseProvider } from "tinybase/ui-react";
export default function HomeLayout() {
  return (
    <TinyBaseProvider>
      <ShoppingListsStore />
      <ListContextProvider>
        <Stack
          screenOptions={{
            ...(process.env.EXPO_OS !== "ios"
              ? {}
              : {
                  headerLargeTitle: true,
                  headerTransparent: true,
                  headerBlurEffect: "systemChromeMaterial",
                  headerLargeTitleShadowVisible: false,
                  headerShadowVisible: true,
                  headerLargeStyle: {
                    backgroundColor: "transparent",
                  },
                }),
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerTitle: "Shopping Lists",
            }}
          />
          <Stack.Screen
            name="list/new/index"
            options={{
              presentation: "formSheet",
              sheetGrabberVisible: true,
              headerShown: false,
            }}
          />{" "}
          <Stack.Screen
            name="profile"
            options={{
              presentation: "formSheet",
              sheetGrabberVisible: true,
              sheetAllowedDetents: [0.75, 1],
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="list/new/scan"
            options={{
              presentation: "fullScreenModal",
              headerLargeTitle: false,
              headerTitle: "Scan QR code",
              headerLeft: () => (
                <Button variant="ghost" onPress={() => router.back()}>
                  Cancel
                </Button>
              ),
            }}
          />
          <Stack.Screen
            name="emoji-picker"
            options={{
              presentation: "formSheet",
              headerTitle: "Choose an Emoji",
              sheetGrabberVisible: true,
              headerLargeTitle: false,
              sheetAllowedDetents: [0.5, 0.75, 1],
            }}
          />
          <Stack.Screen
            name="color-picker"
            options={{
              presentation: "formSheet",
              headerTitle: "Choose a color",
              sheetGrabberVisible: true,
              headerLargeTitle: false,
              sheetAllowedDetents: [0.5, 0.75, 1],
            }}
          />
        </Stack>
      </ListContextProvider>
    </TinyBaseProvider>
  );
}
