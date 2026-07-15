/**
 * 浇灌按钮组件
 * 点击触发水滴下落动画、植物生长动画、花瓣粒子效果
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Sparkles } from 'lucide-react';
import { useGrowthStore } from '@/store/useGrowthStore';
import InnerPlant from '@/components/InnerPlant';

interface WateringButtonProps {
  topicId: number;
  color: string;
  onWatered?: () => void;
}

export default function WateringButton({ topicId, color, onWatered }: WateringButtonProps) {
  const [isWatering, setIsWatering] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const water = useGrowthStore(state => state.water);
  const plant = useGrowthStore(state => state.plant);

  const handleClick = () => {
    if (isWatering) return;

    setIsWatering(true);

    // 执行浇灌
    water(topicId, { selectedAction: undefined });

    // 动画序列
    setTimeout(() => {
      setShowSuccess(true);
    }, 1000);

    setTimeout(() => {
      setIsWatering(false);
      onWatered?.();
    }, 2000);

    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* 成功提示 */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 px-5 py-2.5 bg-plant text-white rounded-full text-sm font-medium shadow-lg flex items-center gap-2"
          >
            <Sparkles size={16} />
            <span>浇灌成功！你的内心植物又长大了一点 🌱</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 水滴动画 */}
      <AnimatePresence>
        {isWatering && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
            {[0, 0.15, 0.3].map((delay, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: [0, 1, 0], y: [0, 60, 80] }}
                transition={{ duration: 1, delay, ease: 'easeIn' }}
                className="absolute left-1/2 -translate-x-1/2"
                style={{ marginLeft: `${(i - 1) * 12}px` }}
              >
                <Droplets size={24} className="text-sky-400" fill="#81D4FA" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* 花瓣粒子 */}
      <AnimatePresence>
        {showSuccess && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => {
              const startX = Math.random() * 100;
              const endX = startX + (Math.random() - 0.5) * 60;
              const duration = 1.5 + Math.random();
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0, x: 0, rotate: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: ['0%', '100%'],
                    x: [`${startX}%`, `${endX}%`],
                    rotate: [0, 180 + Math.random() * 180],
                    scale: [0, 1, 0.5],
                  }}
                  transition={{ duration, delay: i * 0.1, ease: 'easeOut' }}
                  className="absolute top-0 text-lg"
                  style={{ left: `${startX}%` }}
                >
                  🌸
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* 小植物展示 */}
      <div className="mb-4 relative" style={{ width: 120 }}>
        <motion.div
          animate={isWatering ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <InnerPlant stage={plant.stage} size="md" animate={false} />
        </motion.div>
      </div>

      {/* 浇灌按钮 */}
      <motion.button
        onClick={handleClick}
        disabled={isWatering}
        whileHover={{ scale: isWatering ? 1 : 1.05 }}
        whileTap={{ scale: isWatering ? 1 : 0.97 }}
        className="px-8 py-3.5 rounded-full text-white font-medium text-base shadow-lg flex items-center gap-2 transition-all"
        style={{
          background: isWatering
            ? 'linear-gradient(135deg, #81D4FA, #4FC3F7)'
            : `linear-gradient(135deg, ${color}, ${color}dd)`,
          boxShadow: `0 8px 24px ${color}40`,
        }}
      >
        <Droplets size={20} className={isWatering ? 'animate-bounce' : ''} />
        <span>{isWatering ? '浇灌中……' : '浇灌内心植物'}</span>
      </motion.button>

      <p className="mt-3 text-xs text-gray-500">
        完成一次自我对话，浇灌一下你的内心吧 💧
      </p>
    </div>
  );
}
