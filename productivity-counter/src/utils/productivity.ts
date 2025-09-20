import type { Category } from '../components/CategorySelector';

export interface ProductivityRecord {
  id: number;
  category: Category;
  timeInHours: number;
  steps: number;
  sloc: number | null; // null for non-implementation categories
  timestamp: Date;
}

export const calculateSLOC = (steps: number, timeInHours: number): number => {
  if (timeInHours === 0) return 0;
  return Math.round((steps / timeInHours) * 10) / 10; // Round to 1 decimal place
};

export const formatTimeInHours = (seconds: number): number => {
  return Math.round((seconds / 3600) * 1000) / 1000; // Round to 3 decimal places
};

export const createProductivityRecord = (
  id: number,
  category: Category,
  timeInSeconds: number,
  steps: number
): ProductivityRecord => {
  const timeInHours = formatTimeInHours(timeInSeconds);
  const sloc = category === '実装' && timeInHours > 0 ? calculateSLOC(steps, timeInHours) : null;
  
  return {
    id,
    category,
    timeInHours,
    steps: category === '実装' ? steps : 0,
    sloc,
    timestamp: new Date()
  };
};