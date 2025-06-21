import { BodyScrollView } from "@/components/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/text-input";
import { appleBlue, backgroundColors, emojies } from "@/constants/Colors";
import { useListContext } from "@/context/ListContext";
import { useAddShoppingListCallback } from "@/store/ShoppingListsStore";
import { Link, router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreateListScreen() {
  const [listName, setListName] = useState<string>("");
  const [listDescription, setListDescription] = useState<string>("");
  const { selectedColor, selectedEmoji, setSelectedColor, setSelectedEmoji } =
    useListContext();

  const useAddShoppingList = useAddShoppingListCallback();

  const handleCreateList = () => {
    if (!listName) {
      return;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const listId = useAddShoppingList(
      listName,
      listDescription,
      selectedEmoji,
      selectedColor
    );

    router.replace({
      pathname: "/list/[listId]",
      params: {
        listId,
      },
    });
  };

  useEffect(() => {
    setSelectedEmoji(emojies[Math.floor(Math.random() * emojies.length)]);
    setSelectedColor(
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    );

    return () => {
      setSelectedColor("");
      setSelectedEmoji("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "New List",
          headerLargeTitle: false,
        }}
      />
      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Grocery Essentials"
            size="lg"
            variant="ghost"
            returnKeyType="done"
            value={listName}
            onChangeText={setListName}
            onSubmitEditing={() => handleCreateList}
            autoFocus
            inputStyle={styles.titleInput}
            containerStyle={styles.titleInputContainer}
          />
          <Link
            href={{
              pathname: "/emoji-picker",
            }}
            style={[styles.emojiButton, { borderColor: selectedColor }]}
          >
            <View style={styles.emojiContainer}>
              <Text>{selectedEmoji}</Text>
            </View>
          </Link>
          <Link
            href={{ pathname: "/color-picker" }}
            style={[styles.colorButton, { borderColor: selectedColor }]}
          >
            <View style={styles.colorContainer}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 100,
                  backgroundColor: selectedColor,
                }}
              />
            </View>
          </Link>
        </View>
        <TextInput
          placeholder="Description (optional)"
          value={listDescription}
          onChangeText={setListDescription}
          onSubmitEditing={handleCreateList}
          returnKeyType="done"
          variant="ghost"
          inputStyle={styles.descriptionInput}
        />
        <Button
          onPress={handleCreateList}
          disabled={!listName}
          variant="ghost"
          textStyle={styles.createButtonText}
        >
          Create List
        </Button>
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleInput: {
    fontWeight: "600",
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "auto",
    marginBottom: 0,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionInput: {
    padding: 0,
  },
  createButtonText: {
    color: appleBlue,
    fontWeight: "normal",
  },
  colorButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
