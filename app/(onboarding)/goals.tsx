import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../src/components/ui/Button";
import { GoalSelector } from "../../src/components/GoalSelector";
import { Category } from "../../src/types";
import { colors, spacing, fontSize, fontWeight } from "../../src/constants/tokens";

export default function GoalsScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Category[]>([]);

  const toggleGoal = (category: Category) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.step}>Step 1 of 2</Text>
        <Text style={styles.title}>What do you want{"\n"}to improve?</Text>
        <Text style={styles.subtitle}>
          Choose up to 3 areas. We'll personalize your daily missions.
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GoalSelector
          selected={selected}
          onToggle={toggleGoal}
          maxSelections={3}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Continue${selected.length > 0 ? ` (${selected.length}/3)` : ""}`}
          onPress={() =>
            router.push({
              pathname: "/(onboarding)/ready",
              params: { goals: selected.join(",") },
            })
          }
          size="lg"
          style={styles.button}
          disabled={selected.length === 0}
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
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
    marginBottom: spacing.sm,
    lineHeight: 36,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    lineHeight: 24,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  button: {
    width: "100%",
  },
});
