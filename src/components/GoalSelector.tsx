import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Category } from "../types";
import { CATEGORIES } from "../constants/categories";
import { colors, spacing, fontSize, fontWeight, radius } from "../constants/tokens";

interface GoalSelectorProps {
  selected: Category[];
  onToggle: (category: Category) => void;
  maxSelections?: number;
}

export function GoalSelector({
  selected,
  onToggle,
  maxSelections = 3,
}: GoalSelectorProps) {
  return (
    <View style={styles.grid}>
      {CATEGORIES.map((cat) => {
        const isSelected = selected.includes(cat.key);
        const isDisabled = !isSelected && selected.length >= maxSelections;

        return (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.item,
              isSelected && { borderColor: cat.color, backgroundColor: cat.color + "15" },
              isDisabled && styles.disabled,
            ]}
            onPress={() => !isDisabled && onToggle(cat.key)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{cat.emoji}</Text>
            <Text style={[styles.label, isSelected && { color: cat.color }]}>
              {cat.label}
            </Text>
            <Text style={styles.description}>{cat.description}</Text>
            {isSelected && (
              <View style={[styles.checkmark, { backgroundColor: cat.color }]}>
                <Text style={styles.check}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: spacing.md,
  },
  item: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.surfaceBorder,
    position: "relative",
  },
  disabled: {
    opacity: 0.4,
  },
  emoji: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  label: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  checkmark: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  check: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
});
