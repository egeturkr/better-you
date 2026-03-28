import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DailyMission, MissionStatus } from "../types";
import { getMissionById } from "../utils/missionEngine";
import { CATEGORY_MAP } from "../constants/categories";
import { formatDate } from "../utils/dates";
import { colors, spacing, fontSize, fontWeight, radius } from "../constants/tokens";

interface HistoryItemProps {
  dailyMission: DailyMission;
}

const STATUS_CONFIG: Record<MissionStatus, { label: string; color: string; icon: string }> = {
  completed: { label: "Completed", color: colors.success, icon: "✅" },
  skipped: { label: "Skipped", color: colors.skip, icon: "⏭️" },
  missed: { label: "Missed", color: colors.error, icon: "❌" },
};

export function HistoryItem({ dailyMission }: HistoryItemProps) {
  const mission = getMissionById(dailyMission.missionId);
  if (!mission) return null;

  const status = dailyMission.status;
  const config = status ? STATUS_CONFIG[status] : null;
  const category = CATEGORY_MAP[mission.category];

  return (
    <View style={styles.container}>
      <View style={styles.iconCol}>
        <Text style={styles.statusIcon}>{config?.icon || "⏳"}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{mission.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.category}>
            {category?.emoji} {category?.label}
          </Text>
          <Text style={styles.dot}>·</Text>
          <Text style={[styles.status, { color: config?.color || colors.textMuted }]}>
            {config?.label || "Pending"}
          </Text>
        </View>
      </View>
      <Text style={styles.date}>{formatDate(dailyMission.date)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    gap: spacing.md,
  },
  iconCol: {
    width: 32,
    alignItems: "center",
  },
  statusIcon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  category: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  dot: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  status: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  date: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
});
