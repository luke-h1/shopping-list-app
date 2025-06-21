import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function AuthIndexScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAdress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState<string>("");

  return (
    <View>
      <ThemedText type="title">Sign In</ThemedText>
      <Link href="/sign-up">go sign in</Link>
      <Button>Go to sign in</Button>
    </View>
  );
}
