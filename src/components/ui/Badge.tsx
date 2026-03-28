import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { colors, radius, spacing, fontSize, fontWeight } from "../../constants/tokens";

interface BadgeProps {
  label: string;
  color?: string;
  style?: ViewStyle;
}

export function Badge({
  label,
  color = colors.accent,
  style,
}: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color + "20" }, style]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textTransform: "capitalize",
  },
});
