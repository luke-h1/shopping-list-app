import * as React from "react";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { TextInput } from "@/components/ui/text-input";
import { BodyScrollView } from "@/components/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { useCallback, useState } from "react";

export default function ResetPassword() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const onResetPasswordPress = useCallback(async () => {
    if (!isLoaded) return;
    setErrors([]);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });

      setPendingVerification(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, signIn]);

  const onVerifyPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(index)");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, code, password, signIn, setActive, router]);

  if (pendingVerification) {
    return (
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <TextInput
          value={code}
          label={`Enter the verification code we sent to ${emailAddress}`}
          placeholder="Enter your verification code"
          onChangeText={setCode}
        />
        <TextInput
          value={password}
          label="Enter your new password"
          placeholder="Enter your new password"
          secureTextEntry
          onChangeText={setPassword}
        />
        {errors.map((error) => (
          <ThemedText key={error.longMessage} style={{ color: "red" }}>
            {error.longMessage}
          </ThemedText>
        ))}
        <Button onPress={onVerifyPress} disabled={!code || !password}>
          Reset password
        </Button>
      </BodyScrollView>
    );
  }

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        keyboardType="email-address"
        onChangeText={setEmailAddress}
      />
      <Button onPress={onResetPasswordPress} disabled={!emailAddress}>
        Continue
      </Button>
      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: "red" }}>
          {error.longMessage}
        </ThemedText>
      ))}
    </BodyScrollView>
  );
}
