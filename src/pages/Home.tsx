/**
 * 首页 - 生命之虹入口
 * 展示彩虹图谱、阶段切换、内心植物概览
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Leaf, Calendar, Sparkles } from 'lucide-react';
import RainbowArc from '@/components/RainbowArc';
import InnerPlant from '@/components/InnerPlant';
import StageTabs from '@/components/StageTabs';
import { useGrowthStore } from '@/store/useGrowthStore';
import type { Stage } from '@/data/topics';

export default function Home() {
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState<Stage | 'all'>('all');
  const plant = useGrowthStore(state => state.plant);
  const records = useGrowthStore(state => state.records);
  const loadFromStorage = useGrowthStore(state => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const handleTopicClick = (topicId: number) => {
    navigate(`/topic/${topicId}`);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* 顶部标题区 */}
      <header className="pt-12 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-soil/10 mb-4">
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-xs text-soil">对话即成长 · 口袋里的生命流动导师</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-soil-dark tracking-wide">
            生命之虹
          </h1>
          <p className="mt-3 text-base text-gray-600 max-w-md mx-auto">
            16道成果议题 · 浇灌内心植物 · 看见你的成长轨迹
          </p>
        </motion.div>
      </header>

      {/* 彩虹图谱区 */}
      <section className="px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <RainbowArc
            activeStage={activeStage}
            onTopicClick={handleTopicClick}
          />
        </motion.div>
      </section>

      {/* 阶段切换器 */}
      <section className="px-4 mb-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StageTabs activeStage={activeStage} onChange={setActiveStage} />
        </motion.div>
      </section>

      {/* 内心植物概览卡 */}
      <section className="px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-md mx-auto bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-soft border border-soil/10"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0" style={{ width: 100 }}>
              <InnerPlant stage={plant.stage} size="md" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-serif font-semibold text-soil-dark mb-2">
                你的内心植物
              </h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Leaf size={14} className="text-plant" />
                  <span>总浇灌 <strong className="text-soil">{plant.totalWaterings}</strong> 次</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={14} className="text-plant" />
                  <span>连续 <strong className="text-soil">{plant.streak}</strong> 天</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen size={14} className="text-plant" />
                  <span>已探索 <strong className="text-soil">{plant.unlockedTopics.length}</strong> 道议题</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-soil/10 flex gap-3">
            <button
              onClick={() => navigate('/journal')}
              className="flex-1 py-2.5 px-4 rounded-xl bg-plant text-white text-sm font-medium hover:bg-plant-dark transition-colors"
            >
              查看成长日志
            </button>
            <button
              onClick={() => {
                // 随机选一个没探索过的，或者随机
                const available = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
                const randomId = available[Math.floor(Math.random() * available.length)];
                navigate(`/topic/${randomId}`);
              }}
              className="py-2.5 px-4 rounded-xl bg-white text-soil text-sm font-medium border border-soil/20 hover:bg-soil/5 transition-colors"
            >
              今日随机
            </button>
          </div>
        </motion.div>
      </section>

      {/* 使用说明 */}
      <section className="px-4 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-sm text-gray-500 space-y-1"
        >
          <p>🌈 点击彩虹色带，进入一道当下共鸣的议题</p>
          <p>💧 完成自我对话，浇灌内心的植物</p>
          <p>🌱 看见它从种子到开花结果，如你一般成长</p>
        </motion.div>
      </section>
    </div>
  );
}
