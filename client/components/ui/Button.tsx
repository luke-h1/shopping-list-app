import { appleBlue, zincColors } from "@/constants/Colors";
import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { ThemedText } from "../ThemedText";

type ButtonVariant = "filled" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  children,
  disabled = false,
  loading = false,
  onPress,
  size = "md",
  style,
  textStyle,
  variant,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const sizeStyles: Record<
    ButtonSize,
    { height: number; fontSize: number; padding: number }
  > = {
    sm: { height: 36, fontSize: 14, padding: 12 },
    md: { height: 44, fontSize: 16, padding: 16 },
    lg: { height: 55, fontSize: 18, padding: 20 },
  };

  const getVariantStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    };

    switch (variant) {
      case "filled": {
        return {
          ...baseStyle,
          backgroundColor: isDark ? zincColors[50] : zincColors[900],
        };
      }

      case "ghost": {
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
      }

      case "outline": {
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: isDark ? zincColors[700] : zincColors[300],
        };
      }
      default:
        return {};
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return isDark ? zincColors[500] : zincColors[400];
    }

    switch (variant) {
      case "filled":
        return isDark ? zincColors[900] : zincColors[50];

      case "outline":
      case "ghost":
        return appleBlue;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        getVariantStyle(),
        {
          height: sizeStyles[size].height,
          paddingHorizontal: sizeStyles[size].padding,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <ThemedText
          style={StyleSheet.flatten([
            {
              fontSize: sizeStyles[size].fontSize,
              color: getTextColor(),
              textAlign: "center",
              marginBottom: 0,
              fontWeight: 700,
            },
            textStyle,
          ])}
        >
          {children}
        </ThemedText>
      )}
    </Pressable>
  );
}
