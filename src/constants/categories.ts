import { CategoryInfo } from "../types";
import { colors } from "./tokens";

export const CATEGORIES: CategoryInfo[] = [
  {
    key: "mind",
    label: "Mind",
    emoji: "🧠",
    color: colors.categoryMind,
    description: "Grow your knowledge and thinking",
  },
  {
    key: "body",
    label: "Body",
    emoji: "💪",
    color: colors.categoryBody,
    description: "Move more, feel stronger",
  },
  {
    key: "discipline",
    label: "Discipline",
    emoji: "🔥",
    color: colors.categoryDiscipline,
    description: "Build self-control and consistency",
  },
  {
    key: "confidence",
    label: "Confidence",
    emoji: "⭐",
    color: colors.categoryConfidence,
    description: "Step outside your comfort zone",
  },
  {
    key: "productivity",
    label: "Productivity",
    emoji: "⚡",
    color: colors.categoryProductivity,
    description: "Get more done with focus",
  },
  {
    key: "social",
    label: "Social",
    emoji: "🤝",
    color: colors.categorySocial,
    description: "Connect with the people around you",
  },
  {
    key: "emotional",
    label: "Emotional",
    emoji: "🌿",
    color: colors.categoryEmotional,
    description: "Strengthen your inner peace",
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c])
) as Record<string, CategoryInfo>;
