/**
 * localStorage 持久化工具
 * 用于存储成长数据，刷新页面不丢失
 */

const STORAGE_KEYS = {
  PLANT_STATE: 'life_rainbow_plant_state',
  WATERING_RECORDS: 'life_rainbow_watering_records',
  ACTION_CHECKINS: 'life_rainbow_action_checkins',
  QUESTION_ANSWERS: 'life_rainbow_question_answers',
  ACTION_MOODS: 'life_rainbow_action_moods',
} as const;

/**
 * 从localStorage读取数据
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`Failed to load ${key} from localStorage:`, e);
    return defaultValue;
  }
}

/**
 * 保存数据到localStorage
 */
export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage:`, e);
  }
}

/**
 * 清除所有存储数据
 */
export function clearAllStorage(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

export { STORAGE_KEYS };
