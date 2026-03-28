import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, Category, DailyMission, MissionStatus, ProgressData, StreakData } from "../types";
import { selectDailyMission, getMissionById } from "../utils/missionEngine";
import { getTodayKey, daysBetween } from "../utils/dates";
import { getLevel, DIFFICULTY_XP, STREAK_BONUS_XP } from "../constants/levels";

const ALL_CATEGORIES: Category[] = [
  "mind", "body", "discipline", "confidence", "productivity", "social", "emotional",
];

function createEmptyCategoryStats(): ProgressData["categoryStats"] {
  const stats: Record<string, { completed: number; total: number }> = {};
  for (const cat of ALL_CATEGORIES) {
    stats[cat] = { completed: 0, total: 0 };
  }
  return stats as ProgressData["categoryStats"];
}

const initialProgress: ProgressData = {
  totalXp: 0,
  level: 1,
  totalCompleted: 0,
  totalSkipped: 0,
  totalMissed: 0,
  categoryStats: createEmptyCategoryStats(),
};

const initialStreak: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedDate: null,
};

interface AppActions {
  // Onboarding
  completeOnboarding: (goals: Category[], name?: string) => void;

  // Daily mission
  ensureTodayMission: () => void;
  completeMission: () => void;
  skipMission: () => void;

  // Settings
  updateGoals: (goals: Category[]) => void;
  updateDisplayName: (name: string) => void;
  resetAll: () => void;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      // ---- Initial State ----
      user: {
        id: "",
        displayName: "",
        selectedGoals: [],
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      },
      todayMission: null,
      missionHistory: [],
      streak: initialStreak,
      progress: initialProgress,
      recentMissionIds: [],

      // ---- Actions ----

      completeOnboarding: (goals, name) => {
        set((state) => ({
          user: {
            ...state.user,
            id: `user_${Date.now()}`,
            displayName: name || "",
            selectedGoals: goals,
            onboardingCompleted: true,
            createdAt: new Date().toISOString(),
          },
        }));
        // Generate first mission right away
        get().ensureTodayMission();
      },

      ensureTodayMission: () => {
        const state = get();
        const todayKey = getTodayKey();

        // If we already have today's mission, nothing to do
        if (state.todayMission?.date === todayKey) return;

        // If there was a previous mission that wasn't completed/skipped, mark it missed
        if (state.todayMission && state.todayMission.status === null) {
          const missedMission: DailyMission = {
            ...state.todayMission,
            status: "missed" as MissionStatus,
          };
          const mission = getMissionById(missedMission.missionId);
          const category = mission?.category;

          set((state) => ({
            missionHistory: [missedMission, ...state.missionHistory],
            progress: {
              ...state.progress,
              totalMissed: state.progress.totalMissed + 1,
              categoryStats: category
                ? {
                    ...state.progress.categoryStats,
                    [category]: {
                      ...state.progress.categoryStats[category],
                      total: state.progress.categoryStats[category].total + 1,
                    },
                  }
                : state.progress.categoryStats,
            },
            // Reset streak if missed
            streak: {
              ...state.streak,
              currentStreak: 0,
            },
          }));
        }

        // Select a new mission for today
        const updatedState = get();
        const mission = selectDailyMission(
          updatedState.user.selectedGoals,
          updatedState.recentMissionIds
        );

        const newDailyMission: DailyMission = {
          date: todayKey,
          missionId: mission.id,
          status: null,
          completedAt: null,
        };

        set((state) => ({
          todayMission: newDailyMission,
          recentMissionIds: [
            mission.id,
            ...state.recentMissionIds.slice(0, 13), // keep last 14
          ],
        }));
      },

      completeMission: () => {
        const state = get();
        if (!state.todayMission || state.todayMission.status !== null) return;

        const todayKey = getTodayKey();
        const mission = getMissionById(state.todayMission.missionId);
        if (!mission) return;

        const completedMission: DailyMission = {
          ...state.todayMission,
          status: "completed",
          completedAt: new Date().toISOString(),
        };

        // Calculate streak
        const { lastCompletedDate, currentStreak, longestStreak } = state.streak;
        let newStreak = 1;
        if (lastCompletedDate) {
          const gap = daysBetween(todayKey, lastCompletedDate);
          if (gap === 1) {
            newStreak = currentStreak + 1;
          } else if (gap === 0) {
            newStreak = currentStreak; // same day
          }
        }
        const newLongest = Math.max(longestStreak, newStreak);

        // Calculate XP
        const baseXp = mission.xp || DIFFICULTY_XP[mission.difficulty];
        const bonusXp = newStreak >= 3 ? STREAK_BONUS_XP : 0;
        const earnedXp = baseXp + bonusXp;
        const newTotalXp = state.progress.totalXp + earnedXp;

        set({
          todayMission: completedMission,
          missionHistory: [completedMission, ...state.missionHistory],
          streak: {
            currentStreak: newStreak,
            longestStreak: newLongest,
            lastCompletedDate: todayKey,
          },
          progress: {
            ...state.progress,
            totalXp: newTotalXp,
            level: getLevel(newTotalXp),
            totalCompleted: state.progress.totalCompleted + 1,
            categoryStats: {
              ...state.progress.categoryStats,
              [mission.category]: {
                completed:
                  state.progress.categoryStats[mission.category].completed + 1,
                total:
                  state.progress.categoryStats[mission.category].total + 1,
              },
            },
          },
        });
      },

      skipMission: () => {
        const state = get();
        if (!state.todayMission || state.todayMission.status !== null) return;

        const mission = getMissionById(state.todayMission.missionId);
        const category = mission?.category;

        const skippedMission: DailyMission = {
          ...state.todayMission,
          status: "skipped",
        };

        set({
          todayMission: skippedMission,
          missionHistory: [skippedMission, ...state.missionHistory],
          streak: {
            ...state.streak,
            currentStreak: 0, // streak broken on skip
          },
          progress: {
            ...state.progress,
            totalSkipped: state.progress.totalSkipped + 1,
            categoryStats: category
              ? {
                  ...state.progress.categoryStats,
                  [category]: {
                    ...state.progress.categoryStats[category],
                    total:
                      state.progress.categoryStats[category].total + 1,
                  },
                }
              : state.progress.categoryStats,
          },
        });
      },

      updateGoals: (goals) => {
        set((state) => ({
          user: { ...state.user, selectedGoals: goals },
        }));
      },

      updateDisplayName: (name) => {
        set((state) => ({
          user: { ...state.user, displayName: name },
        }));
      },

      resetAll: () => {
        set({
          user: {
            id: "",
            displayName: "",
            selectedGoals: [],
            onboardingCompleted: false,
            createdAt: new Date().toISOString(),
          },
          todayMission: null,
          missionHistory: [],
          streak: initialStreak,
          progress: initialProgress,
          recentMissionIds: [],
        });
      },
    }),
    {
      name: "better-you-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
