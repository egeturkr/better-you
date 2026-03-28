import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppStore } from "../../src/store/useAppStore";
import { getMissionById } from "../../src/utils/missionEngine";
import { MissionCard } from "../../src/components/MissionCard";
import { StreakCounter } from "../../src/components/StreakCounter";
import { CompletionModal } from "../../src/components/CompletionModal";
import { Button } from "../../src/components/ui/Button";
import { ProgressBar } from "../../src/components/ui/ProgressBar";
import { getXpForCurrentLevel, getXpToNextLevel, getLevelTitle } from "../../src/constants/levels";
import { colors, spacing, fontSize, fontWeight } from "../../src/constants/tokens";

export default function HomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  const user = useAppStore((s) => s.user);
  const todayMission = useAppStore((s) => s.todayMission);
  const streak = useAppStore((s) => s.streak);
  const progress = useAppStore((s) => s.progress);
  const ensureTodayMission = useAppStore((s) => s.ensureTodayMission);
  const completeMission = useAppStore((s) => s.completeMission);
  const skipMission = useAppStore((s) => s.skipMission);

  useEffect(() => {
    ensureTodayMission();
  }, []);

  const mission = todayMission ? getMissionById(todayMission.missionId) : null;
  const isActive = todayMission?.status === null;
  const isCompleted = todayMission?.status === "completed";
  const isSkipped = todayMission?.status === "skipped";

  const handleComplete = () => {
    if (!mission) return;
    const xpBefore = progress.totalXp;
    completeMission();
    const xpAfter = useAppStore.getState().progress.totalXp;
    setEarnedXp(xpAfter - xpBefore);
    setShowModal(true);
  };

  const levelXp = getXpForCurrentLevel(progress.totalXp);
  const nextLevelXp = getXpToNextLevel();
  const greeting = user.displayName
    ? `Hey, ${user.displayName}`
    : "Hey there";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting} 👋</Text>
            <Text style={styles.subtitle}>Ready for today's mission?</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Lv {progress.level}</Text>
          </View>
        </View>

        {/* XP Bar */}
        <View style={styles.xpSection}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpLabel}>
              {getLevelTitle(progress.level)}
            </Text>
            <Text style={styles.xpValue}>
              {levelXp} / {nextLevelXp} XP
            </Text>
          </View>
          <ProgressBar progress={levelXp / nextLevelXp} />
        </View>

        {/* Streak */}
        <StreakCounter
          currentStreak={streak.currentStreak}
          longestStreak={streak.longestStreak}
        />

        {/* Today's Mission */}
        <View style={styles.missionSection}>
          <Text style={styles.sectionTitle}>Today's Mission</Text>

          {mission ? (
            <>
              <MissionCard mission={mission} />

              {isActive && (
                <View style={styles.actions}>
                  <Button
                    title="Complete Mission"
                    onPress={handleComplete}
                    size="lg"
                    style={styles.completeButton}
                  />
                  <Button
                    title="Skip"
                    onPress={skipMission}
                    variant="ghost"
                    size="sm"
                  />
                </View>
              )}

              {isCompleted && (
                <View style={styles.doneCard}>
                  <Text style={styles.doneEmoji}>✅</Text>
                  <Text style={styles.doneText}>
                    Mission completed! Come back tomorrow.
                  </Text>
                </View>
              )}

              {isSkipped && (
                <View style={styles.doneCard}>
                  <Text style={styles.doneEmoji}>⏭️</Text>
                  <Text style={styles.doneText}>
                    Mission skipped. Try again tomorrow!
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.doneCard}>
              <Text style={styles.doneText}>Loading your mission...</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <CompletionModal
        visible={showModal}
        mission={mission || null}
        xpEarned={earnedXp}
        currentStreak={useAppStore.getState().streak.currentStreak}
        onClose={() => setShowModal(false)}
      />
    </SafeAreaView>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  levelBadge: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.accent + "40",
  },
  levelText: {
    color: colors.accent,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  xpSection: {
    gap: spacing.sm,
  },
  xpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  xpLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  xpValue: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
  missionSection: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  actions: {
    gap: spacing.sm,
    alignItems: "center",
  },
  completeButton: {
    width: "100%",
  },
  doneCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  doneEmoji: {
    fontSize: 32,
  },
  doneText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    textAlign: "center",
  },
});
