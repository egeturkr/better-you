import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAppStore } from "../src/store/useAppStore";
import { colors, fontSize, fontWeight } from "../src/constants/tokens";

export default function SplashScreen() {
  const router = useRouter();
  const onboardingCompleted = useAppStore((s) => s.user.onboardingCompleted);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onboardingCompleted) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(onboarding)/welcome");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [onboardingCompleted]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>✦</Text>
      <Text style={styles.title}>BetterYou</Text>
      <Text style={styles.subtitle}>Become the best version of yourself</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 56,
    color: colors.accent,
    marginBottom: 16,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.hero,
    fontWeight: fontWeight.bold,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
});
