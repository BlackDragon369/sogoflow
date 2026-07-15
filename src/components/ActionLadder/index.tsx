/**
 * 微行动阶梯组件
 * 四级台阶式行动建议：本周 → 本月 → 本季 → 本年
 * 可勾选"我要开始"，并添加情感贴图（勇敢、慈悲、爱、放弃、臣服等）
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Heart, Shield, HandHeart, Wind, Feather, Sun, Leaf, Zap } from 'lucide-react';
import { useGrowthStore } from '@/store/useGrowthStore';
import { MoodType } from '@/store/useGrowthStore';

interface ActionLadderProps {
  actions: {
    weekly: string;
    monthly: string;
    quarterly: string;
    yearly: string;
  };
  topicId: number;
  color: string;
}

const levels = [
  { key: 'weekly' as const, label: '本周', step: 1, height: 'h-16' },
  { key: 'monthly' as const, label: '本月', step: 2, height: 'h-20' },
  { key: 'quarterly' as const, label: '本季', step: 3, height: 'h-24' },
  { key: 'yearly' as const, label: '本年', step: 4, height: 'h-28' },
];

const moodOptions: { type: MoodType; label: string; icon: typeof Heart; color: string }[] = [
  { type: 'brave', label: '勇敢', icon: Shield, color: '#FF6B6B' },
  { type: 'compassionate', label: '慈悲', icon: HandHeart, color: '#4ECDC4' },
  { type: 'love', label: '爱', icon: Heart, color: '#FF8E72' },
  { type: 'letgo', label: '放下', icon: Wind, color: '#A8D8EA' },
  { type: 'surrender', label: '臣服', icon: Feather, color: '#95E1D3' },
  { type: 'hope', label: '希望', icon: Sun, color: '#FFE66D' },
  { type: 'gratitude', label: '感恩', icon: Leaf, color: '#88D8B0' },
  { type: 'strength', label: '力量', icon: Zap, color: '#FF9F43' },
];

export default function ActionLadder({ actions, topicId, color }: ActionLadderProps) {
  const toggleAction = useGrowthStore(state => state.toggleAction);
  const isActionChecked = useGrowthStore(state => state.isActionChecked);
  const setActionMood = useGrowthStore(state => state.setActionMood);
  const getActionMood = useGrowthStore(state => state.getActionMood);

  const [showMoodPicker, setShowMoodPicker] = useState<{ topicId: number; actionKey: string } | null>(null);

  const handleToggle = (actionKey: string) => {
    toggleAction(topicId, actionKey);
  };

  const handleMoodClick = (actionKey: string, mood: MoodType) => {
    setActionMood(topicId, actionKey, mood);
    setShowMoodPicker(null);
  };

  const toggleMoodPicker = (actionKey: string) => {
    const current = showMoodPicker;
    if (current && current.actionKey === actionKey) {
      setShowMoodPicker(null);
    } else {
      setShowMoodPicker({ topicId, actionKey });
    }
  };

  const getCurrentMood = (actionKey: string) => {
    const moodType = getActionMood(topicId, actionKey);
    return moodOptions.find(m => m.type === moodType);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-serif font-semibold text-soil-dark flex items-center gap-2">
        <span
          className="w-1 h-5 rounded-full"
          style={{ backgroundColor: color }}
        />
        微行动阶梯 · from small to large
      </h3>

      <div className="relative flex items-end gap-3 pb-4 overflow-x-auto">
        {levels.map((level, index) => {
          const actionText = actions[level.key];
          const isChecked = isActionChecked(topicId, level.key);
          const currentMood = getCurrentMood(level.key);
          const isPickerOpen = showMoodPicker?.actionKey === level.key;

          return (
            <motion.div
              key={level.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex-1 min-w-[120px] flex flex-col"
            >
              <button
                onClick={() => handleToggle(level.key)}
                className={`
                  relative w-full ${level.height} rounded-xl transition-all duration-300
                  flex flex-col items-center justify-end pb-3
                  border-2
                  ${isChecked ? 'shadow-hover scale-[1.02]' : 'shadow-soft hover:shadow-hover hover:-translate-y-1'}
                `}
                style={{
                  backgroundColor: isChecked ? color : 'rgba(255,255,255,0.7)',
                  borderColor: isChecked ? color : 'rgba(93, 64, 55, 0.1)',
                }}
              >
                {isChecked && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <Check size={12} style={{ color }} />
                  </div>
                )}
                <div
                  className={`text-xs font-medium mb-1 ${isChecked ? 'text-white' : 'text-gray-500'}`}
                >
                  {level.label}
                </div>
                <div
                  className={`text-[11px] leading-tight text-center px-2 line-clamp-3 ${isChecked ? 'text-white/90' : 'text-soil'}`}
                >
                  {actionText}
                </div>
              </button>

              {isChecked && (
                <motion.button
                  onClick={() => toggleMoodPicker(level.key)}
                  className={`
                    mt-2 flex items-center justify-center gap-1.5 py-1.5 rounded-lg
                    transition-all duration-300 hover:scale-105
                    ${isPickerOpen ? 'ring-2 ring-offset-2' : ''}
                  `}
                  style={{
                    backgroundColor: currentMood?.color || `${color}20`,
                    '--tw-ring-color': currentMood?.color || color,
                  } as React.CSSProperties}
                >
                  {currentMood ? (
                    <>
                      <currentMood.icon size={12} className="text-white" />
                      <span className="text-xs font-medium text-white">{currentMood.label}</span>
                    </>
                  ) : (
                    <>
                      <Heart size={12} style={{ color }} />
                      <span className="text-xs text-gray-500">选个心情</span>
                    </>
                  )}
                </motion.button>
              )}

              <AnimatePresence>
                {isPickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 mt-1 p-2 bg-white rounded-xl shadow-lg border border-soil/10 flex flex-wrap gap-1.5 min-w-[160px]"
                    style={{ marginTop: `${(index + 1) * 80 + 10}px` }}
                  >
                    {moodOptions.map(mood => (
                      <button
                        key={mood.type}
                        onClick={() => handleMoodClick(level.key, mood.type)}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        title={mood.label}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${mood.color}20` }}
                        >
                          <mood.icon size={14} style={{ color: mood.color }} />
                        </div>
                        <span className="text-[10px] text-gray-600">{mood.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <span>从最小的一步开始</span>
        <ArrowRight size={12} />
        <span>点击卡片许下承诺，选择情感贴图标记当下状态</span>
      </div>
    </div>
  );
}
