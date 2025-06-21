import { BodyScrollView } from "@/components/BodyScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import TextInput from "@/components/ui/text-input";
import { appleRed } from "@/constants/Colors";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const [emailAdress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      await signUp.create({
        emailAddress: emailAdress,
        password,
      });

      // send confirmation code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const onVerifyPress = async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({
          session: signUpAttempt.createdSessionId,
        });
        router.replace("/(index)");
      } else {
        console.log("not complete..", signUpAttempt);
      }
    } catch (e) {}
  };

  if (pendingVerification) {
    return (
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <TextInput
          value={code}
          label={`Enter the verification code we sent to ${emailAdress}`}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <Button
          onPress={onVerifyPress}
          disabled={!code || loading}
          loading={loading}
        >
          Verify
        </Button>
        {errors.map((error) => (
          <ThemedText key={error.longMessage} style={{ color: "red" }}>
            {error.longMessage}
          </ThemedText>
        ))}
      </BodyScrollView>
    );
  }

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
        onPress={onSignUpPress}
        loading={loading}
        disabled={!emailAdress || !password}
      >
        Continue
      </Button>

      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Already have an account?</ThemedText>
        <Button variant="ghost" onPress={() => router.push("/sign-up")}>
          Sign In
        </Button>
      </View>
      {errors &&
        errors.map((e) => (
          <ThemedText key={e.longMessage} style={{ color: appleRed }}>
            {e.longMessage}
          </ThemedText>
        ))}
    </BodyScrollView>
  );
}
