// ---- Enums / Constants ----

export type Category =
  | "mind"
  | "body"
  | "discipline"
  | "confidence"
  | "productivity"
  | "social"
  | "emotional";

export type Difficulty = "easy" | "medium" | "hard";

export type MissionStatus = "completed" | "skipped" | "missed";

// ---- Mission Content (static, bundled with app) ----

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  estimatedMinutes: number;
  xp: number;
  tags: string[];
}

// ---- Daily Mission (one per day) ----

export interface DailyMission {
  date: string; // "YYYY-MM-DD"
  missionId: string;
  status: MissionStatus | null; // null = still active
  completedAt: string | null;
}

// ---- User Profile ----

export interface UserProfile {
  id: string;
  displayName: string;
  selectedGoals: Category[];
  onboardingCompleted: boolean;
  createdAt: string;
}

// ---- Streaks ----

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
}

// ---- Progress ----

export interface CategoryStat {
  completed: number;
  total: number;
}

export interface ProgressData {
  totalXp: number;
  level: number;
  totalCompleted: number;
  totalSkipped: number;
  totalMissed: number;
  categoryStats: Record<Category, CategoryStat>;
}

// ---- App State ----

export interface AppState {
  user: UserProfile;
  todayMission: DailyMission | null;
  missionHistory: DailyMission[];
  streak: StreakData;
  progress: ProgressData;
  recentMissionIds: string[];
}

// ---- Category Metadata ----

export interface CategoryInfo {
  key: Category;
  label: string;
  emoji: string;
  color: string;
  description: string;
}
