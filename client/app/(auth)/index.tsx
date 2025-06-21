import { BodyScrollView } from "@/components/BodyScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import TextInput from "@/components/ui/text-input";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { ClerkAPIError } from "@clerk/types";
import { appleRed } from "@/constants/Colors";

export default function AuthIndexScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAdress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    if (process.env.EXPO_OS === "ios") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsSigningIn(true);
    setErrors([]);

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAdress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(index)");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsSigningIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, signIn, emailAdress, password, setActive]);

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
    >
      <TextInput
        label="Email"
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmailAddress}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        autoCapitalize="none"
        keyboardType="visible-password"
        onChangeText={setPassword}
      />
      <Button
        onPress={onSignInPress}
        loading={!!isSigningIn}
        disabled={!emailAdress || !password || !!isSigningIn}
      >
        Sign in
      </Button>
      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: appleRed }}>
          {error.longMessage}
        </ThemedText>
      ))}
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Don&apos;t have an account?</ThemedText>
        <Button variant="ghost" onPress={() => router.push("/sign-up")}>
          Sign Up
        </Button>
      </View>
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Forgot Password?</ThemedText>
        <Button
          variant="ghost"
          onPress={() => router.push("/(auth)/reset-password")}
        >
          Reset Password
        </Button>
      </View>
    </BodyScrollView>
  );
}
