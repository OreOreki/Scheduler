import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface FuzzyDate {
  day: number | null;
  month: number | null;
  year: number | null;
}

export function fuzzyDate({ day, month, year }: FuzzyDate): Date | null {
  if (day === null || month === null || year === null) {
    return null;
  }

  return new Date(year, month - 1, day);
}
