import type { ProductivityRecord } from './productivity';

const STORAGE_KEY = 'productivity-counter-records';

export const saveRecordsToStorage = (records: ProductivityRecord[]): void => {
  try {
    const serializedRecords = JSON.stringify(records.map(record => ({
      ...record,
      timestamp: record.timestamp.toISOString()
    })));
    localStorage.setItem(STORAGE_KEY, serializedRecords);
  } catch (error) {
    console.error('Failed to save records to localStorage:', error);
  }
};

export const loadRecordsFromStorage = (): ProductivityRecord[] => {
  try {
    const serializedRecords = localStorage.getItem(STORAGE_KEY);
    if (!serializedRecords) return [];
    
    const parsedRecords = JSON.parse(serializedRecords);
    return parsedRecords.map((record: any) => ({
      ...record,
      timestamp: new Date(record.timestamp)
    }));
  } catch (error) {
    console.error('Failed to load records from localStorage:', error);
    return [];
  }
};

export const clearStorageRecords = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear records from localStorage:', error);
  }
};