import { backgroundColors } from "@/constants/Colors";
import { useListContext } from "@/context/ListContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable, View } from "react-native";

export default function ColorPickerScreen() {
  const { setSelectedColor } = useListContext();
  const handleColorSelect = (emoji: string) => {
    setSelectedColor(emoji);
    router.back();
  };

  const router = useRouter();

  return (
    <FlatList<string>
      data={backgroundColors}
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
          onPress={() => handleColorSelect(item)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: item,
            }}
          />
        </Pressable>
      )}
    />
  );
}
