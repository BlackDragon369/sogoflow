/**
 * 成长状态管理 store
 * 管理植物状态、浇灌记录、行动勾选等
 */

import { create } from 'zustand';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/utils/storage';
import { generateId, todayStr, isSameDay, isConsecutiveDay } from '@/utils/date';

export type PlantStage = 'seed' | 'sprout' | 'leaf' | 'flower' | 'fruit';

export type MoodType = 'brave' | 'compassionate' | 'love' | 'letgo' | 'surrender' | 'hope' | 'gratitude' | 'strength';

export interface QuestionAnswer {
  id: string;
  topicId: number;
  questionIndex: number;
  questionText: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActionMood {
  topicId: number;
  actionKey: string;
  mood: MoodType;
  timestamp: string;
}

export interface WateringRecord {
  id: string;
  topicId: number;
  date: string;
  mood?: string;
  reflection?: string;
  selectedAction?: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

export interface PlantState {
  stage: PlantStage;
  totalWaterings: number;
  streak: number;
  lastWaterDate: string | null;
  unlockedTopics: number[];
}

interface GrowthStore {
  plant: PlantState;
  records: WateringRecord[];
  actionCheckins: Record<string, boolean>;
  questionAnswers: QuestionAnswer[];
  actionMoods: ActionMood[];
  /** 执行一次浇灌 */
  water: (topicId: number, data?: Partial<WateringRecord>) => void;
  /** 获取某议题的浇灌次数 */
  getTopicWaterCount: (topicId: number) => number;
  /** 勾选/取消勾选行动 */
  toggleAction: (topicId: number, actionKey: string) => void;
  /** 检查行动是否已勾选 */
  isActionChecked: (topicId: number, actionKey: string) => boolean;
  /** 保存问题回答 */
  saveAnswer: (topicId: number, questionIndex: number, questionText: string, answer: string) => void;
  /** 获取某议题的所有回答 */
  getTopicAnswers: (topicId: number) => QuestionAnswer[];
  /** 获取某个问题的回答 */
  getAnswer: (topicId: number, questionIndex: number) => QuestionAnswer | undefined;
  /** 为行动添加情感贴图 */
  setActionMood: (topicId: number, actionKey: string, mood: MoodType) => void;
  /** 获取行动的情感贴图 */
  getActionMood: (topicId: number, actionKey: string) => MoodType | undefined;
  /** 从本地存储加载数据 */
  loadFromStorage: () => void;
  /** 重置所有数据 */
  resetAll: () => void;
}

const defaultPlantState: PlantState = {
  stage: 'seed',
  totalWaterings: 0,
  streak: 0,
  lastWaterDate: null,
  unlockedTopics: [],
};

/**
 * 根据总浇灌次数计算植物阶段
 */
function calcPlantStage(total: number): PlantStage {
  if (total >= 30) return 'fruit';
  if (total >= 15) return 'flower';
  if (total >= 7) return 'leaf';
  if (total >= 2) return 'sprout';
  return 'seed';
}

/**
 * 计算连续浇灌天数
 */
function calcStreak(lastDate: string | null, recordsLen: number): number {
  if (!lastDate || recordsLen === 0) return 0;
  const today = todayStr();
  if (isSameDay(lastDate, today)) return 1;
  if (isConsecutiveDay(lastDate, today)) return 2;
  return 0;
}

export const useGrowthStore = create<GrowthStore>((set, get) => ({
  plant: defaultPlantState,
  records: [],
  actionCheckins: {},
  questionAnswers: [],
  actionMoods: [],

  water: (topicId, data = {}) => {
    const today = todayStr();
    const existingToday = get().records.find(
      r => r.topicId === topicId && isSameDay(r.date, today)
    );

    const newRecord: WateringRecord = {
      id: generateId(),
      topicId,
      date: today,
      ...data,
    } as WateringRecord;

    set(state => {
      const filteredRecords = state.records.filter(
        r => !(r.topicId === topicId && isSameDay(r.date, today))
      );
      const newRecords = [newRecord, ...filteredRecords];
      const newTotal = existingToday
        ? state.plant.totalWaterings
        : state.plant.totalWaterings + 1;

      let newStreak = state.plant.streak;
      if (!existingToday) {
        if (
          state.plant.lastWaterDate &&
          isConsecutiveDay(state.plant.lastWaterDate, today)
        ) {
          newStreak = state.plant.streak + 1;
        } else {
          newStreak = 1;
        }
      }

      const newUnlocked = state.plant.unlockedTopics.includes(topicId)
        ? state.plant.unlockedTopics
        : [...state.plant.unlockedTopics, topicId];

      const newPlant: PlantState = {
        stage: calcPlantStage(newTotal),
        totalWaterings: newTotal,
        streak: newStreak,
        lastWaterDate: today,
        unlockedTopics: newUnlocked,
      };

      saveToStorage(STORAGE_KEYS.PLANT_STATE, newPlant);
      saveToStorage(STORAGE_KEYS.WATERING_RECORDS, newRecords);

      return {
        records: newRecords,
        plant: newPlant,
      };
    });
  },

  getTopicWaterCount: (topicId: number) => {
    return get().records.filter(r => r.topicId === topicId).length;
  },

  toggleAction: (topicId, actionKey) => {
    const key = `${topicId}_${actionKey}`;
    set(state => {
      const newCheckins = { ...state.actionCheckins };
      if (newCheckins[key]) {
        delete newCheckins[key];
      } else {
        newCheckins[key] = true;
      }
      saveToStorage(STORAGE_KEYS.ACTION_CHECKINS, newCheckins);
      return { actionCheckins: newCheckins };
    });
  },

  isActionChecked: (topicId, actionKey) => {
    return !!get().actionCheckins[`${topicId}_${actionKey}`];
  },

  saveAnswer: (topicId, questionIndex, questionText, answer) => {
    const now = new Date().toISOString();
    set(state => {
      const existingIndex = state.questionAnswers.findIndex(
        a => a.topicId === topicId && a.questionIndex === questionIndex
      );
      
      let newAnswers: QuestionAnswer[];
      if (existingIndex >= 0) {
        newAnswers = [...state.questionAnswers];
        newAnswers[existingIndex] = {
          ...newAnswers[existingIndex],
          answer,
          questionText,
          updatedAt: now,
        };
      } else {
        newAnswers = [
          ...state.questionAnswers,
          {
            id: generateId(),
            topicId,
            questionIndex,
            questionText,
            answer,
            createdAt: now,
            updatedAt: now,
          },
        ];
      }
      
      saveToStorage(STORAGE_KEYS.QUESTION_ANSWERS, newAnswers);
      return { questionAnswers: newAnswers };
    });
  },

  getTopicAnswers: (topicId: number) => {
    return get().questionAnswers.filter(a => a.topicId === topicId).sort((a, b) => a.questionIndex - b.questionIndex);
  },

  getAnswer: (topicId: number, questionIndex: number) => {
    return get().questionAnswers.find(a => a.topicId === topicId && a.questionIndex === questionIndex);
  },

  setActionMood: (topicId, actionKey, mood) => {
    const now = new Date().toISOString();
    set(state => {
      const existingIndex = state.actionMoods.findIndex(
        m => m.topicId === topicId && m.actionKey === actionKey
      );
      
      let newMoods: ActionMood[];
      if (existingIndex >= 0) {
        newMoods = [...state.actionMoods];
        newMoods[existingIndex] = { ...newMoods[existingIndex], mood, timestamp: now };
      } else {
        newMoods = [...state.actionMoods, { topicId, actionKey, mood, timestamp: now }];
      }
      
      saveToStorage(STORAGE_KEYS.ACTION_MOODS, newMoods);
      return { actionMoods: newMoods };
    });
  },

  getActionMood: (topicId: number, actionKey: string) => {
    const mood = get().actionMoods.find(m => m.topicId === topicId && m.actionKey === actionKey);
    return mood?.mood;
  },

  loadFromStorage: () => {
    const plant = loadFromStorage<PlantState>(STORAGE_KEYS.PLANT_STATE, defaultPlantState);
    const records = loadFromStorage<WateringRecord[]>(STORAGE_KEYS.WATERING_RECORDS, []);
    const actionCheckins = loadFromStorage<Record<string, boolean>>(
      STORAGE_KEYS.ACTION_CHECKINS,
      {}
    );
    const questionAnswers = loadFromStorage<QuestionAnswer[]>(STORAGE_KEYS.QUESTION_ANSWERS, []);
    const actionMoods = loadFromStorage<ActionMood[]>(STORAGE_KEYS.ACTION_MOODS, []);
    set({ plant, records, actionCheckins, questionAnswers, actionMoods });
  },

  resetAll: () => {
    saveToStorage(STORAGE_KEYS.PLANT_STATE, defaultPlantState);
    saveToStorage(STORAGE_KEYS.WATERING_RECORDS, []);
    saveToStorage(STORAGE_KEYS.ACTION_CHECKINS, {});
    saveToStorage(STORAGE_KEYS.QUESTION_ANSWERS, []);
    saveToStorage(STORAGE_KEYS.ACTION_MOODS, []);
    set({
      plant: defaultPlantState,
      records: [],
      actionCheckins: {},
      questionAnswers: [],
      actionMoods: [],
    });
  },
}));
