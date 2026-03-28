import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fontSize, fontWeight, radius } from "../constants/tokens";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakCounter({ currentStreak, longestStreak }: StreakCounterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.fire}>🔥</Text>
        <Text style={styles.number}>{currentStreak}</Text>
        <Text style={styles.label}>Current</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.fire}>⚡</Text>
        <Text style={styles.number}>{longestStreak}</Text>
        <Text style={styles.label}>Best</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xs,
  },
  divider: {
    width: 1,
    backgroundColor: colors.surfaceBorder,
    marginHorizontal: spacing.md,
  },
  fire: {
    fontSize: 24,
  },
  number: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  label: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
});
