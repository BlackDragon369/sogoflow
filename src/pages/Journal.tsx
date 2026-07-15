/**
 * 成长日志页
 * 展示植物状态、成长数据、彩虹点亮进度、时间线日志
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Droplets, Calendar, Award, Leaf, RotateCcw } from 'lucide-react';
import InnerPlant from '@/components/InnerPlant';
import JournalTimeline from '@/components/JournalTimeline';
import RainbowArc from '@/components/RainbowArc';
import { useGrowthStore } from '@/store/useGrowthStore';
import { topics } from '@/data/topics';

export default function Journal() {
  const navigate = useNavigate();
  const plant = useGrowthStore(state => state.plant);
  const records = useGrowthStore(state => state.records);
  const loadFromStorage = useGrowthStore(state => state.loadFromStorage);
  const resetAll = useGrowthStore(state => state.resetAll);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const handleReset = () => {
    if (confirm('确定要重置所有成长数据吗？这个操作不可撤销。')) {
      resetAll();
      setShowReset(false);
    }
  };

  const stats = [
    { icon: Droplets, label: '总浇灌', value: plant.totalWaterings, unit: '次', color: '#4FC3F7' },
    { icon: Calendar, label: '连续天数', value: plant.streak, unit: '天', color: '#FFB74D' },
    { icon: Award, label: '已探索', value: plant.unlockedTopics.length, unit: '道', color: '#BA68C8' },
    { icon: Leaf, label: '植物阶段', value: plant.stage === 'seed' ? '种子' : plant.stage === 'sprout' ? '萌芽' : plant.stage === 'leaf' ? '长叶' : plant.stage === 'flower' ? '开花' : '结果', unit: '', color: '#66BB6A' },
  ];

  const stageNames: Record<string, string> = {
    seed: '种子期',
    sprout: '萌芽期',
    leaf: '生长期',
    flower: '开花期',
    fruit: '结果期',
  };

  const nextStageMilestone = {
    seed: { next: '萌芽', need: 2 },
    sprout: { next: '长叶', need: 7 },
    leaf: { next: '开花', need: 15 },
    flower: { next: '结果', need: 30 },
    fruit: { next: '圆满', need: 50 },
  };

  const milestone = nextStageMilestone[plant.stage];
  const progress = Math.min(100, (plant.totalWaterings / milestone.need) * 100);

  return (
    <div className="min-h-screen pb-16">
      {/* 顶部导航 */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-20 backdrop-blur-md bg-cream/80 border-b border-soil/5"
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-full hover:bg-soil/5 transition-colors"
          >
            <ArrowLeft size={20} className="text-soil" />
          </button>
          <h1 className="flex-1 text-lg font-serif font-semibold text-soil-dark">
            成长日志
          </h1>
          <button
            onClick={() => setShowReset(!showReset)}
            className="p-2 -mr-2 rounded-full hover:bg-soil/5 transition-colors text-gray-400 hover:text-soil"
            aria-label="重置数据"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </motion.header>

      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-6">
        {/* 植物展示卡 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-soil/10 shadow-soft"
        >
          <div className="flex items-center gap-6">
            <div style={{ width: 140 }}>
              <InnerPlant stage={plant.stage} size="lg" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-serif font-bold text-soil-dark mb-1">
                {stageNames[plant.stage]}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                距离下一阶段：{milestone.next}（还需 {Math.max(0, milestone.need - plant.totalWaterings)} 次浇灌）
              </p>
              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #81C784, #4CAF50)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* 数据统计 */}
          <div className="grid grid-cols-4 gap-2 mt-6 pt-5 border-t border-soil/10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-9 h-9 mx-auto mb-1.5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon size={16} style={{ color: stat.color }} />
                </div>
                <div className="text-lg font-bold text-soil-dark">
                  {stat.value}<span className="text-xs font-normal text-gray-500 ml-0.5">{stat.unit}</span>
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 彩虹点亮进度 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-soil/10 shadow-soft"
        >
          <h3 className="text-base font-serif font-semibold text-soil-dark mb-3 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-red-400 via-yellow-400 to-purple-400" />
            彩虹点亮进度
          </h3>
          <RainbowArc size={500} />
          <p className="text-center text-xs text-gray-500 mt-2">
            已点亮 {plant.unlockedTopics.length} / {topics.length} 道议题
          </p>
        </motion.div>

        {/* 时间线日志 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-soil/10 shadow-soft"
        >
          <h3 className="text-base font-serif font-semibold text-soil-dark mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-plant" />
            浇灌时间线
          </h3>
          <JournalTimeline
            records={records}
            onTopicClick={(id) => navigate(`/topic/${id}`)}
          />
        </motion.div>

        {/* 重置确认 */}
        {showReset && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
          >
            <p className="text-sm text-red-700 mb-3">
              确定要清除所有成长数据吗？
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowReset(false)}
                className="px-4 py-1.5 rounded-full bg-white text-gray-600 text-sm border border-gray-200"
              >
                取消
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-1.5 rounded-full bg-red-500 text-white text-sm"
              >
                确认重置
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
