import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colors, radius, spacing } from "../../constants/tokens";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "default" | "highlighted";
}

export function Card({ children, style, variant = "default" }: CardProps) {
  return (
    <View
      style={[
        styles.base,
        variant === "highlighted" && styles.highlighted,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  highlighted: {
    borderColor: colors.accent,
    borderWidth: 1.5,
  },
});
