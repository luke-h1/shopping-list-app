import { emojies } from "@/constants/Colors";
import { useListContext } from "@/context/ListContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text } from "react-native";

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
      numColumns={5}
      keyExtractor={(item) => item}
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 100,
      }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handleEmojiSelect(item)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 40,
            }}
          >
            {item}
          </Text>
        </Pressable>
      )}
    />
  );
}
