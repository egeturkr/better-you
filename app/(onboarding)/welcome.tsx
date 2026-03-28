import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../src/components/ui/Button";
import { colors, spacing, fontSize, fontWeight } from "../../src/constants/tokens";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.logo}>✦</Text>
          <Text style={styles.title}>BetterYou</Text>
          <Text style={styles.tagline}>
            Become the best{"\n"}version of yourself
          </Text>
        </View>

        <View style={styles.features}>
          <FeatureItem emoji="🎯" text="One meaningful mission every day" />
          <FeatureItem emoji="🔥" text="Build streaks and consistency" />
          <FeatureItem emoji="📈" text="Track your growth across life areas" />
          <FeatureItem emoji="⚡" text="Earn XP and level up" />
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Start Your Journey"
          onPress={() => router.push("/(onboarding)/goals")}
          size="lg"
          style={styles.button}
        />
        <Text style={styles.footerText}>
          Small actions, real growth
        </Text>
      </View>
    </SafeAreaView>
  );
}

function FeatureItem({ emoji, text }: { emoji: string; text: string }) {
  return (
    <View style={styles.featureRow}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
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
    justifyContent: "center",
  },
  hero: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  logo: {
    fontSize: 64,
    color: colors.accent,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.hero,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: fontSize.lg,
    textAlign: "center",
    lineHeight: 28,
  },
  features: {
    gap: spacing.md,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  featureEmoji: {
    fontSize: 22,
  },
  featureText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    flex: 1,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
    alignItems: "center",
  },
  button: {
    width: "100%",
  },
  footerText: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
});
