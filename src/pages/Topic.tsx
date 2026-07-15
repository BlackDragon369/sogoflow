/**
 * 议题详情页
 * 展示可视化场景、图画式引导、三层提问、微行动阶梯、浇灌按钮
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTopicById, topics, stageConfig } from '@/data/topics';
import TopicScene from '@/components/TopicScene';
import GuidedQuestions from '@/components/GuidedQuestions';
import ActionLadder from '@/components/ActionLadder';
import WateringButton from '@/components/WateringButton';
import { useGrowthStore } from '@/store/useGrowthStore';

export default function Topic() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const topicId = parseInt(id || '1', 10);
  const topic = getTopicById(topicId);
  const loadFromStorage = useGrowthStore(state => state.loadFromStorage);
  const [waterTrigger, setWaterTrigger] = useState(0);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-soil mb-4">未找到这道议题</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-full bg-plant text-white text-sm"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const stage = stageConfig[topic.stage];
  const currentIndex = topics.findIndex(t => t.id === topicId);
  const prevTopic = topics[currentIndex - 1];
  const nextTopic = topics[currentIndex + 1];

  const handleWatered = () => {
    setWaterTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* 顶部导航栏 */}
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
            aria-label="返回首页"
          >
            <ArrowLeft size={20} className="text-soil" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 truncate">
              {stage.ageRange} · {stage.label}
            </div>
            <div className="text-sm font-serif font-semibold text-soil-dark truncate">
              色{topic.id} · {topic.title}
            </div>
          </div>
          <div
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: topic.color }}
          />
        </div>
      </motion.header>

      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-6">
        {/* 可视化场景 */}
        <TopicScene scene={topic.scene} color={topic.color} title={topic.title} />

        {/* 议题标题 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <div
            className="inline-block px-3 py-1 rounded-full text-xs text-white font-medium mb-2"
            style={{ backgroundColor: topic.color }}
          >
            色{topic.id} · {topic.subtitle}
          </div>
          <h1 className="text-2xl font-serif font-bold text-soil-dark">
            {topic.title}
          </h1>
        </motion.div>

        {/* 图画式引导文案 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-soil/10 shadow-soft"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
            <span
              className="w-1 h-4 rounded-full"
              style={{ backgroundColor: topic.color }}
            />
            图画式引导
          </h3>
          <p className="text-base text-soil-dark leading-relaxed font-serif italic">
            {topic.imagery}
          </p>
        </motion.div>

        {/* 三层引导提问 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GuidedQuestions questions={topic.questions} color={topic.color} topicId={topicId} />
        </motion.div>

        {/* 微行动阶梯 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ActionLadder actions={topic.actions} topicId={topicId} color={topic.color} />
        </motion.div>

        {/* 浇灌按钮区 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-soil/10 shadow-soft"
        >
          <WateringButton
            topicId={topicId}
            color={topic.color}
            onWatered={handleWatered}
          />
        </motion.div>

        {/* 上一道 / 下一道 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex justify-between items-center py-4"
        >
          {prevTopic ? (
            <button
              onClick={() => navigate(`/topic/${prevTopic.id}`)}
              className="flex items-center gap-1 text-sm text-soil hover:text-plant transition-colors"
            >
              <ChevronLeft size={18} />
              <span>色{prevTopic.id} {prevTopic.title}</span>
            </button>
          ) : <div />}
          {nextTopic ? (
            <button
              onClick={() => navigate(`/topic/${nextTopic.id}`)}
              className="flex items-center gap-1 text-sm text-soil hover:text-plant transition-colors"
            >
              <span>色{nextTopic.id} {nextTopic.title}</span>
              <ChevronRight size={18} />
            </button>
          ) : <div />}
        </motion.div>
      </div>

      {/* 底部悬浮操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-cream to-transparent pt-8 pb-4 px-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={() => navigate('/journal')}
            className="flex-1 py-3 rounded-full bg-white/90 backdrop-blur-sm text-soil text-sm font-medium border border-soil/10 shadow-soft hover:bg-white transition-colors"
          >
            📖 成长日志
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 rounded-full bg-plant text-white text-sm font-medium shadow-soft hover:bg-plant-dark transition-colors"
          >
            🌈 回到彩虹
          </button>
        </div>
      </div>
    </div>
  );
}
