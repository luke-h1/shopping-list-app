import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { TokenCache } from "@clerk/clerk-expo";

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);

        if (item) {
          console.log("item was used");
        }

        console.log("no key found");
        return item;
      } catch (e) {
        console.warn(e);
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

export const tokenCache =
  Platform.OS !== "web" ? createTokenCache() : undefined;
