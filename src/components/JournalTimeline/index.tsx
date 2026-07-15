/**
 * 日志时间线组件
 * 以植物茎干为时间轴，展示浇灌记录
 */

import { motion } from 'framer-motion';
import { Droplets, Leaf } from 'lucide-react';
import { getTopicById } from '@/data/topics';
import { formatFriendlyDate } from '@/utils/date';
import type { WateringRecord } from '@/store/useGrowthStore';

interface JournalTimelineProps {
  records: WateringRecord[];
  onTopicClick?: (topicId: number) => void;
}

const actionLabels: Record<string, string> = {
  weekly: '本周行动',
  monthly: '本月行动',
  quarterly: '本季行动',
  yearly: '本年行动',
};

export default function JournalTimeline({ records, onTopicClick }: JournalTimelineProps) {
  if (records.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🌱</div>
        <p className="text-soil font-medium">还没有浇灌记录</p>
        <p className="text-sm text-gray-500 mt-1">
          去彩虹上选一道共鸣的议题，开始你的第一次浇灌吧
        </p>
      </div>
    );
  }

  // 按日期分组
  const grouped: Record<string, WateringRecord[]> = {};
  records.forEach(record => {
    const date = record.date;
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(record);
  });

  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="relative">
      {/* 茎干 - 时间轴 */}
      <div
        className="absolute left-5 top-0 bottom-0 w-1 rounded-full"
        style={{
          background: 'linear-gradient(to bottom, #81C784, #4CAF50, #388E3C)',
          opacity: 0.6,
        }}
      />

      <div className="space-y-6">
        {dates.map((date, dateIndex) => (
          <motion.div
            key={date}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: dateIndex * 0.05 }}
          >
            {/* 日期节点 - 叶子 */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-plant flex items-center justify-center shadow-sm">
                <Leaf size={16} className="text-plant" />
              </div>
              <div className="text-sm font-medium text-soil-dark">
                {formatFriendlyDate(date)}
              </div>
              <div className="text-xs text-gray-400">{date}</div>
            </div>

            {/* 当日记录 */}
            <div className="ml-12 space-y-3">
              {grouped[date].map((record, idx) => {
                const topic = getTopicById(record.topicId);
                if (!topic) return null;

                return (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: dateIndex * 0.05 + idx * 0.05 }}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-soil/10 shadow-sm hover:shadow-soft transition-shadow cursor-pointer"
                    onClick={() => onTopicClick?.(record.topicId)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: topic.color }}
                      >
                        {topic.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-semibold text-soil-dark">
                            {topic.title}
                          </span>
                          <span className="text-xs text-gray-400">
                            {topic.ageRange}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {topic.subtitle}
                        </div>

                        {record.selectedAction && (
                          <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-plant/10 text-plant text-xs">
                            <Droplets size={10} />
                            {actionLabels[record.selectedAction] || '行动承诺'}
                          </div>
                        )}

                        {record.mood && (
                          <div className="mt-2 text-sm text-gray-600">
                            心情：{record.mood}
                          </div>
                        )}

                        {record.reflection && (
                          <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">
                            {record.reflection}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
