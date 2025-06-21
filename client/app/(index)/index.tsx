import { BodyScrollView } from "@/components/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue } from "@/constants/Colors";
import { useClerk } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function HomeScreen() {
  const { signOut } = useClerk();
  const router = useRouter();

  const renderHeaderRight = () => {
    return (
      <Pressable onPress={() => router.push("/list/new")}>
        <IconSymbol name="plus" color={appleBlue} />
      </Pressable>
    );
  };

  const renderHeaderLeft = () => {
    return (
      <Pressable onPress={() => router.push("/profile")}>
        <IconSymbol name="gear" color={appleBlue} />
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: renderHeaderLeft,
          headerRight: renderHeaderRight,
        }}
      />
      <BodyScrollView>
        <Button
          onPress={() => {
            console.log("sign out");
            signOut();
          }}
          style={{}}
        >
          Sign out
        </Button>
      </BodyScrollView>
    </>
  );
}
