import { Category, Mission } from "../types";
import { MISSIONS } from "../constants/missions";

/**
 * Selects a daily mission based on user goals, avoiding recent repeats.
 * Weighted: missions matching user goals are 3x more likely to be selected.
 */
export function selectDailyMission(
  selectedGoals: Category[],
  recentMissionIds: string[]
): Mission {
  // Filter out recently used missions
  const recentSet = new Set(recentMissionIds);
  let candidates = MISSIONS.filter((m) => !recentSet.has(m.id));

  // If somehow all are recent, reset
  if (candidates.length === 0) {
    candidates = MISSIONS;
  }

  // Build weighted pool: goal-aligned missions get 3x weight
  const weighted: Mission[] = [];
  const goalSet = new Set(selectedGoals);

  for (const mission of candidates) {
    const weight = goalSet.has(mission.category) ? 3 : 1;
    for (let i = 0; i < weight; i++) {
      weighted.push(mission);
    }
  }

  // Random selection from weighted pool
  const index = Math.floor(Math.random() * weighted.length);
  return weighted[index];
}

/**
 * Get a mission by its ID.
 */
export function getMissionById(id: string): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}

/**
 * Get all missions for a given category.
 */
export function getMissionsByCategory(category: Category): Mission[] {
  return MISSIONS.filter((m) => m.category === category);
}
