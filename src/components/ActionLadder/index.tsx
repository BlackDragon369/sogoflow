/**
 * 微行动阶梯组件
 * 四级台阶式行动建议：本周 → 本月 → 本季 → 本年
 * 可勾选"我要开始"
 */

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useGrowthStore } from '@/store/useGrowthStore';

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

export default function ActionLadder({ actions, topicId, color }: ActionLadderProps) {
  const toggleAction = useGrowthStore(state => state.toggleAction);
  const isActionChecked = useGrowthStore(state => state.isActionChecked);

  const handleToggle = (actionKey: string) => {
    toggleAction(topicId, actionKey);
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

      <div className="flex items-end gap-3 pb-4 overflow-x-auto">
        {levels.map((level, index) => {
          const actionText = actions[level.key];
          const isChecked = isActionChecked(topicId, level.key);

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
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <span>从最小的一步开始</span>
        <ArrowRight size={12} />
        <span>点击卡片，许下一个行动承诺</span>
      </div>
    </div>
  );
}
