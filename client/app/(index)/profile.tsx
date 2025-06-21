import { BodyScrollView } from "@/components/BodyScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { useClerk } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { signOut } = useClerk();
  return (
    <BodyScrollView>
      <ThemedText>Profile</ThemedText>
      <Button onPress={() => signOut()} variant="ghost">
        Sign Out
      </Button>
    </BodyScrollView>
  );
}
