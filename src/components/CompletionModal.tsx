import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { Mission } from "../types";
import { Button } from "./ui/Button";
import { colors, spacing, fontSize, fontWeight, radius } from "../constants/tokens";

interface CompletionModalProps {
  visible: boolean;
  mission: Mission | null;
  xpEarned: number;
  currentStreak: number;
  onClose: () => void;
}

export function CompletionModal({
  visible,
  mission,
  xpEarned,
  currentStreak,
  onClose,
}: CompletionModalProps) {
  if (!mission) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>Mission Complete!</Text>
          <Text style={styles.missionTitle}>{mission.title}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>+{xpEarned}</Text>
              <Text style={styles.statLabel}>XP earned</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>🔥 {currentStreak}</Text>
              <Text style={styles.statLabel}>Day streak</Text>
            </View>
          </View>

          <Text style={styles.motivation}>
            {currentStreak >= 7
              ? "Unstoppable! Keep this energy going."
              : currentStreak >= 3
              ? "You're building momentum. Don't stop now!"
              : "Great start. Come back tomorrow for more."}
          </Text>

          <Button
            title="Continue"
            onPress={onClose}
            size="lg"
            style={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  content: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.accent,
  },
  emoji: {
    fontSize: 56,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  missionTitle: {
    color: colors.accent,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: spacing.md,
    width: "100%",
    marginBottom: spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.surfaceBorder,
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
  motivation: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  button: {
    width: "100%",
  },
});
