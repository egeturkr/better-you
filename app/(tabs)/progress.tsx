import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppStore } from "../../src/store/useAppStore";
import { Card } from "../../src/components/ui/Card";
import { ProgressBar } from "../../src/components/ui/ProgressBar";
import { CATEGORIES } from "../../src/constants/categories";
import { getXpForCurrentLevel, getXpToNextLevel, getLevelTitle } from "../../src/constants/levels";
import { colors, spacing, fontSize, fontWeight, radius } from "../../src/constants/tokens";

export default function ProgressScreen() {
  const progress = useAppStore((s) => s.progress);
  const streak = useAppStore((s) => s.streak);

  const levelXp = getXpForCurrentLevel(progress.totalXp);
  const nextLevelXp = getXpToNextLevel();
  const totalMissions = progress.totalCompleted + progress.totalSkipped + progress.totalMissed;
  const completionRate = totalMissions > 0
    ? Math.round((progress.totalCompleted / totalMissions) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Progress</Text>

        {/* Level Card */}
        <Card variant="highlighted">
          <View style={styles.levelHeader}>
            <Text style={styles.levelEmoji}>⚡</Text>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>Level {progress.level}</Text>
              <Text style={styles.levelSubtitle}>{getLevelTitle(progress.level)}</Text>
            </View>
            <Text style={styles.totalXp}>{progress.totalXp} XP</Text>
          </View>
          <ProgressBar progress={levelXp / nextLevelXp} />
          <Text style={styles.xpRemaining}>
            {nextLevelXp - levelXp} XP to next level
          </Text>
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard value={progress.totalCompleted.toString()} label="Completed" emoji="✅" />
          <StatCard value={`${completionRate}%`} label="Completion rate" emoji="📊" />
          <StatCard value={streak.currentStreak.toString()} label="Current streak" emoji="🔥" />
          <StatCard value={streak.longestStreak.toString()} label="Best streak" emoji="⚡" />
        </View>

        {/* Category Breakdown */}
        <Text style={styles.sectionTitle}>Category Progress</Text>
        <View style={styles.categoryList}>
          {CATEGORIES.map((cat) => {
            const stat = progress.categoryStats[cat.key];
            const pct = stat.total > 0 ? stat.completed / stat.total : 0;

            return (
              <View key={cat.key} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                  <Text style={styles.categoryCount}>
                    {stat.completed}/{stat.total}
                  </Text>
                </View>
                <ProgressBar progress={pct} color={cat.color} height={6} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ value, label, emoji }: { value: string; label: string; emoji: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  levelEmoji: {
    fontSize: 32,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  levelSubtitle: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  totalXp: {
    color: colors.accent,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  xpRemaining: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    marginTop: spacing.sm,
    textAlign: "right",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    width: "47%",
    alignItems: "center",
    gap: spacing.xs,
  },
  statEmoji: {
    fontSize: 22,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  categoryList: {
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  categoryItem: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    gap: spacing.sm,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  categoryEmoji: {
    fontSize: 18,
  },
  categoryLabel: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    flex: 1,
  },
  categoryCount: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
});
