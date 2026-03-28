// ---- Design Tokens ----

export const colors = {
  // Core palette
  background: "#0F0F0F",
  surface: "#1A1A1A",
  surfaceLight: "#242424",
  surfaceBorder: "#2E2E2E",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  textMuted: "#666666",

  // Accent
  accent: "#6C63FF", // primary purple
  accentLight: "#8B83FF",
  accentDark: "#5046E5",
  accentSoft: "rgba(108, 99, 255, 0.15)",

  // Status
  success: "#34D399",
  successSoft: "rgba(52, 211, 153, 0.15)",
  warning: "#FBBF24",
  warningSoft: "rgba(251, 191, 36, 0.15)",
  error: "#F87171",
  errorSoft: "rgba(248, 113, 113, 0.15)",
  skip: "#64748B",

  // Category colors
  categoryMind: "#6C63FF",
  categoryBody: "#34D399",
  categoryDiscipline: "#F59E0B",
  categoryConfidence: "#EC4899",
  categoryProductivity: "#3B82F6",
  categorySocial: "#8B5CF6",
  categoryEmotional: "#F97316",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  hero: 36,
} as const;

export const fontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

export const shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
} as const;
