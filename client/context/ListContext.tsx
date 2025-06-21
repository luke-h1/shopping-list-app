import { createContext, ReactNode, useContext, useState } from "react";

type ListCreationContext = {
  selectedEmoji: string;
  selectedColor: string;
  setSelectedEmoji: (emoji: string) => void;
  setSelectedColor: (color: string) => void;
};

const ListContext = createContext<ListCreationContext | undefined>(undefined);

export function ListContextProvider({ children }: { children: ReactNode }) {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("😅");
  const [selectedColor, setSelectedColor] = useState<string>("#9ccaff");

  return (
    <ListContext.Provider
      value={{
        selectedColor,
        selectedEmoji,
        setSelectedColor,
        setSelectedEmoji,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

export const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error(
      "useListContext must be used within a list context provider"
    );
  }
  return context;
};
