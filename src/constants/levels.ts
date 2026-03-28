// XP thresholds per level: level = floor(totalXp / 100) + 1
// Max level for MVP: 50

export const XP_PER_LEVEL = 100;
export const MAX_LEVEL = 50;

export const DIFFICULTY_XP = {
  easy: 15,
  medium: 25,
  hard: 40,
} as const;

export const STREAK_BONUS_XP = 5; // bonus XP per mission when on a 3+ day streak

export function getLevel(totalXp: number): number {
  return Math.min(Math.floor(totalXp / XP_PER_LEVEL) + 1, MAX_LEVEL);
}

export function getXpForCurrentLevel(totalXp: number): number {
  return totalXp % XP_PER_LEVEL;
}

export function getXpToNextLevel(): number {
  return XP_PER_LEVEL;
}

export function getLevelTitle(level: number): string {
  if (level <= 3) return "Beginner";
  if (level <= 7) return "Starter";
  if (level <= 12) return "Builder";
  if (level <= 18) return "Achiever";
  if (level <= 25) return "Warrior";
  if (level <= 33) return "Champion";
  if (level <= 42) return "Legend";
  return "Master";
}
