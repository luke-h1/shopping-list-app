import { ThemedText } from "@/components/ThemedText";
import { emojies } from "@/constants/Colors";
import { useListContext } from "@/context/ListContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable } from "react-native";

export default function EmojiPickerScreen() {
  const { setSelectedEmoji } = useListContext();
  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    router.back();
  };
  const router = useRouter();

  return (
    <FlatList<string>
      data={emojies}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleEmojiSelect(item)}>
          <ThemedText>{item}</ThemedText>
        </Pressable>
      )}
    />
  );
}
