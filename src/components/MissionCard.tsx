import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Mission } from "../types";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { CATEGORY_MAP } from "../constants/categories";
import { colors, spacing, fontSize, fontWeight } from "../constants/tokens";

interface MissionCardProps {
  mission: Mission;
  showCategory?: boolean;
}

export function MissionCard({ mission, showCategory = true }: MissionCardProps) {
  const category = CATEGORY_MAP[mission.category];

  return (
    <Card variant="highlighted">
      {showCategory && (
        <View style={styles.categoryRow}>
          <Text style={styles.emoji}>{category?.emoji}</Text>
          <Badge label={category?.label || mission.category} color={category?.color} />
          <View style={styles.spacer} />
          <Badge
            label={mission.difficulty}
            color={
              mission.difficulty === "easy"
                ? colors.success
                : mission.difficulty === "medium"
                ? colors.warning
                : colors.error
            }
          />
        </View>
      )}

      <Text style={styles.title}>{mission.title}</Text>
      <Text style={styles.description}>{mission.description}</Text>

      <View style={styles.metaRow}>
        {mission.estimatedMinutes > 0 && (
          <Text style={styles.meta}>
            {mission.estimatedMinutes} min
          </Text>
        )}
        <Text style={styles.xp}>+{mission.xp} XP</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  emoji: {
    fontSize: fontSize.lg,
  },
  spacer: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  meta: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  xp: {
    color: colors.accent,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
});
