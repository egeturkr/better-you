import { format, isToday, isYesterday, parseISO, differenceInCalendarDays } from "date-fns";

export function getTodayKey(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export function formatDate(dateStr: string): string {
  const date = parseISO(dateStr);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMM d, yyyy");
}

export function daysBetween(dateStr1: string, dateStr2: string): number {
  return Math.abs(
    differenceInCalendarDays(parseISO(dateStr1), parseISO(dateStr2))
  );
}
