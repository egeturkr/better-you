import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAppStore } from "../../src/store/useAppStore";
import { Card } from "../../src/components/ui/Card";
import { Button } from "../../src/components/ui/Button";
import { GoalSelector } from "../../src/components/GoalSelector";
import { Category } from "../../src/types";
import { getLevelTitle } from "../../src/constants/levels";
import { CATEGORY_MAP } from "../../src/constants/categories";
import { colors, spacing, fontSize, fontWeight, radius } from "../../src/constants/tokens";

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const progress = useAppStore((s) => s.progress);
  const updateGoals = useAppStore((s) => s.updateGoals);
  const updateDisplayName = useAppStore((s) => s.updateDisplayName);
  const resetAll = useAppStore((s) => s.resetAll);

  const [editingGoals, setEditingGoals] = useState(false);
  const [tempGoals, setTempGoals] = useState<Category[]>(user.selectedGoals);
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(user.displayName);

  const toggleGoal = (cat: Category) => {
    setTempGoals((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const saveGoals = () => {
    updateGoals(tempGoals);
    setEditingGoals(false);
  };

  const saveName = () => {
    updateDisplayName(tempName.trim());
    setEditingName(false);
  };

  const handleReset = () => {
    Alert.alert(
      "Reset All Data",
      "This will erase all your progress, history, and settings. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset Everything",
          style: "destructive",
          onPress: () => {
            resetAll();
            router.replace("/");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Profile</Text>

        {/* Profile Card */}
        <Card>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.displayName ? user.displayName[0].toUpperCase() : "?"}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              {editingName ? (
                <View style={styles.editNameRow}>
                  <TextInput
                    style={styles.nameInput}
                    value={tempName}
                    onChangeText={setTempName}
                    placeholder="Your name"
                    placeholderTextColor={colors.textMuted}
                    autoFocus
                  />
                  <Button title="Save" onPress={saveName} size="sm" />
                </View>
              ) : (
                <>
                  <Text style={styles.name}>
                    {user.displayName || "No name set"}
                  </Text>
                  <Text style={styles.levelLabel}>
                    Level {progress.level} · {getLevelTitle(progress.level)}
                  </Text>
                </>
              )}
            </View>
            {!editingName && (
              <Button
                title="Edit"
                onPress={() => {
                  setTempName(user.displayName);
                  setEditingName(true);
                }}
                variant="ghost"
                size="sm"
              />
            )}
          </View>
        </Card>

        {/* Goals Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Growth Goals</Text>
            {!editingGoals && (
              <Button
                title="Edit"
                onPress={() => {
                  setTempGoals(user.selectedGoals);
                  setEditingGoals(true);
                }}
                variant="ghost"
                size="sm"
              />
            )}
          </View>

          {editingGoals ? (
            <>
              <GoalSelector
                selected={tempGoals}
                onToggle={toggleGoal}
                maxSelections={3}
              />
              <View style={styles.editActions}>
                <Button
                  title="Cancel"
                  onPress={() => setEditingGoals(false)}
                  variant="secondary"
                  size="sm"
                />
                <Button
                  title="Save Goals"
                  onPress={saveGoals}
                  size="sm"
                  disabled={tempGoals.length === 0}
                />
              </View>
            </>
          ) : (
            <View style={styles.goalTags}>
              {user.selectedGoals.map((g) => {
                const cat = CATEGORY_MAP[g];
                return (
                  <View key={g} style={[styles.goalTag, { borderColor: cat?.color }]}>
                    <Text>{cat?.emoji}</Text>
                    <Text style={[styles.goalText, { color: cat?.color }]}>
                      {cat?.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* Stats */}
        <Card>
          <Text style={styles.cardTitle}>Quick Stats</Text>
          <View style={styles.statsList}>
            <StatRow label="Total XP" value={`${progress.totalXp} XP`} />
            <StatRow label="Missions completed" value={progress.totalCompleted.toString()} />
            <StatRow label="Missions skipped" value={progress.totalSkipped.toString()} />
            <StatRow label="Missions missed" value={progress.totalMissed.toString()} />
          </View>
        </Card>

        {/* Danger Zone */}
        <Button
          title="Reset All Data"
          onPress={handleReset}
          variant="danger"
          size="md"
          style={styles.resetButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
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
    paddingBottom: spacing.xxl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  avatarText: {
    color: colors.accent,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  levelLabel: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  editNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  nameInput: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.sm,
    padding: spacing.sm,
    color: colors.textPrimary,
    fontSize: fontSize.md,
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  goalTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  goalTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1.5,
    backgroundColor: colors.surface,
  },
  goalText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  editActions: {
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "flex-end",
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  statsList: {
    gap: spacing.sm,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  resetButton: {
    marginTop: spacing.md,
  },
});
