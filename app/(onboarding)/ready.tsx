import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../src/components/ui/Button";
import { useAppStore } from "../../src/store/useAppStore";
import { Category } from "../../src/types";
import { CATEGORY_MAP } from "../../src/constants/categories";
import { colors, spacing, fontSize, fontWeight, radius } from "../../src/constants/tokens";

export default function ReadyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ goals: string }>();
  const [name, setName] = useState("");
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);

  const goals = (params.goals?.split(",") || []) as Category[];

  const handleStart = () => {
    completeOnboarding(goals, name.trim());
    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.step}>Step 2 of 2</Text>
        <Text style={styles.title}>You're almost ready!</Text>

        <View style={styles.nameSection}>
          <Text style={styles.label}>What should we call you?</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name (optional)"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.goalsSection}>
          <Text style={styles.label}>Your focus areas</Text>
          <View style={styles.goalTags}>
            {goals.map((g) => {
              const cat = CATEGORY_MAP[g];
              return (
                <View key={g} style={[styles.goalTag, { borderColor: cat?.color }]}>
                  <Text style={styles.goalEmoji}>{cat?.emoji}</Text>
                  <Text style={[styles.goalText, { color: cat?.color }]}>
                    {cat?.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.promiseCard}>
          <Text style={styles.promiseTitle}>Your daily commitment</Text>
          <Text style={styles.promiseText}>
            One mission per day. Complete it, earn XP, build your streak.
            Small actions compound into real transformation.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Begin My Journey"
          onPress={handleStart}
          size="lg"
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  step: {
    color: colors.accent,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xl,
  },
  nameSection: {
    marginBottom: spacing.xl,
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.textPrimary,
    fontSize: fontSize.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  goalsSection: {
    marginBottom: spacing.xl,
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
  goalEmoji: {
    fontSize: 16,
  },
  goalText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  promiseCard: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accent + "30",
  },
  promiseTitle: {
    color: colors.accent,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  promiseText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  button: {
    width: "100%",
  },
});
