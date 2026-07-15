/**
 * 内心植物组件
 * 根据成长阶段展示不同状态的植物：种子 → 萌芽 → 长叶 → 开花 → 结果
 */

import { motion } from 'framer-motion';
import type { PlantStage } from '@/store/useGrowthStore';

interface InnerPlantProps {
  stage: PlantStage;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const sizeMap = {
  sm: 80,
  md: 160,
  lg: 280,
};

/**
 * 根据植物阶段渲染对应的SVG图形
 */
function PlantSVG({ stage, size }: { stage: PlantStage; size: number }) {
  const potHeight = size * 0.2;
  const soilY = size - potHeight;
  const centerX = size / 2;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto" aria-label={`内心植物 - ${stage}`}>
      <defs>
        <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8D6E63" />
          <stop offset="50%" stopColor="#6D4C41" />
          <stop offset="100%" stopColor="#5D4037" />
        </linearGradient>
        <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#795548" />
          <stop offset="100%" stopColor="#4E342E" />
        </linearGradient>
        <radialGradient id="leafGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="100%" stopColor="#4CAF50" />
        </radialGradient>
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#66BB6A" />
          <stop offset="50%" stopColor="#81C784" />
          <stop offset="100%" stopColor="#66BB6A" />
        </linearGradient>
      </defs>

      {/* 花盆 */}
      <path
        d={`M ${size * 0.2} ${soilY} L ${size * 0.15} ${size - 5} L ${size * 0.85} ${size - 5} L ${size * 0.8} ${soilY} Z`}
        fill="url(#potGrad)"
      />
      <ellipse
        cx={centerX}
        cy={soilY + 3}
        rx={size * 0.31}
        ry={8}
        fill="url(#soilGrad)"
      />

      {/* 种子 */}
      {stage === 'seed' && (
        <g className="animate-float">
          <ellipse
            cx={centerX}
            cy={soilY - 6}
            rx={size * 0.06}
            ry={size * 0.09}
            fill="#A1887F"
            stroke="#795548"
            strokeWidth="1.5"
          />
          <path
            d={`M ${centerX - 3} ${soilY - 12} Q ${centerX} ${soilY - 18} ${centerX + 3} ${soilY - 12}`}
            fill="none"
            stroke="#8D6E63"
            strokeWidth="1"
          />
        </g>
      )}

      {/* 萌芽 */}
      {stage === 'sprout' && (
        <g className="animate-sway">
          <path
            d={`M ${centerX} ${soilY} Q ${centerX - 3} ${soilY - size * 0.15} ${centerX} ${soilY - size * 0.25}`}
            fill="none"
            stroke="url(#stemGrad)"
            strokeWidth={size * 0.035}
            strokeLinecap="round"
          />
          <ellipse
            cx={centerX - size * 0.05}
            cy={soilY - size * 0.2}
            rx={size * 0.06}
            ry={size * 0.03}
            fill="url(#leafGrad)"
            transform={`rotate(-30 ${centerX - size * 0.05} ${soilY - size * 0.2})`}
          />
          <ellipse
            cx={centerX + size * 0.05}
            cy={soilY - size * 0.23}
            rx={size * 0.06}
            ry={size * 0.03}
            fill="url(#leafGrad)"
            transform={`rotate(30 ${centerX + size * 0.05} ${soilY - size * 0.23})`}
          />
        </g>
      )}

      {/* 长叶 */}
      {stage === 'leaf' && (
        <g className="animate-sway" style={{ animationDuration: '5s' }}>
          <path
            d={`M ${centerX} ${soilY} Q ${centerX - 2} ${soilY - size * 0.25} ${centerX} ${soilY - size * 0.45}`}
            fill="none"
            stroke="url(#stemGrad)"
            strokeWidth={size * 0.04}
            strokeLinecap="round"
          />
          {/* 左叶1 */}
          <ellipse
            cx={centerX - size * 0.12}
            cy={soilY - size * 0.3}
            rx={size * 0.1}
            ry={size * 0.035}
            fill="url(#leafGrad)"
            transform={`rotate(-25 ${centerX - size * 0.12} ${soilY - size * 0.3})`}
          />
          {/* 右叶1 */}
          <ellipse
            cx={centerX + size * 0.1}
            cy={soilY - size * 0.38}
            rx={size * 0.1}
            ry={size * 0.035}
            fill="url(#leafGrad)"
            transform={`rotate(25 ${centerX + size * 0.1} ${soilY - size * 0.38})`}
          />
          {/* 左叶2 */}
          <ellipse
            cx={centerX - size * 0.08}
            cy={soilY - size * 0.43}
            rx={size * 0.08}
            ry={size * 0.03}
            fill="url(#leafGrad)"
            transform={`rotate(-35 ${centerX - size * 0.08} ${soilY - size * 0.43})`}
          />
          {/* 顶芽 */}
          <circle cx={centerX} cy={soilY - size * 0.45} r={size * 0.03} fill="#A5D6A7" />
        </g>
      )}

      {/* 开花 */}
      {stage === 'flower' && (
        <g className="animate-sway" style={{ animationDuration: '6s' }}>
          <path
            d={`M ${centerX} ${soilY} Q ${centerX - 2} ${soilY - size * 0.3} ${centerX} ${soilY - size * 0.55}`}
            fill="none"
            stroke="url(#stemGrad)"
            strokeWidth={size * 0.045}
            strokeLinecap="round"
          />
          {/* 叶子 */}
          <ellipse
            cx={centerX - size * 0.13}
            cy={soilY - size * 0.35}
            rx={size * 0.11}
            ry={size * 0.04}
            fill="url(#leafGrad)"
            transform={`rotate(-20 ${centerX - size * 0.13} ${soilY - size * 0.35})`}
          />
          <ellipse
            cx={centerX + size * 0.12}
            cy={soilY - size * 0.45}
            rx={size * 0.1}
            ry={size * 0.035}
            fill="url(#leafGrad)"
            transform={`rotate(20 ${centerX + size * 0.12} ${soilY - size * 0.45})`}
          />
          {/* 花朵 */}
          <g transform={`translate(${centerX}, ${soilY - size * 0.58})`}>
            {[0, 60, 120, 180, 240, 300].map(angle => (
              <ellipse
                key={angle}
                cx={0}
                cy={-size * 0.07}
                rx={size * 0.04}
                ry={size * 0.075}
                fill="#F48FB1"
                opacity="0.9"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx={0} cy={0} r={size * 0.035} fill="#FFD54F" />
          </g>
        </g>
      )}

      {/* 结果 */}
      {stage === 'fruit' && (
        <g className="animate-sway" style={{ animationDuration: '7s' }}>
          <path
            d={`M ${centerX} ${soilY} Q ${centerX - 2} ${soilY - size * 0.35} ${centerX} ${soilY - size * 0.6}`}
            fill="none"
            stroke="url(#stemGrad)"
            strokeWidth={size * 0.05}
            strokeLinecap="round"
          />
          {/* 大叶子 */}
          <ellipse
            cx={centerX - size * 0.15}
            cy={soilY - size * 0.38}
            rx={size * 0.13}
            ry={size * 0.045}
            fill="url(#leafGrad)"
            transform={`rotate(-15 ${centerX - size * 0.15} ${soilY - size * 0.38})`}
          />
          <ellipse
            cx={centerX + size * 0.14}
            cy={soilY - size * 0.48}
            rx={size * 0.12}
            ry={size * 0.04}
            fill="url(#leafGrad)"
            transform={`rotate(15 ${centerX + size * 0.14} ${soilY - size * 0.48})`}
          />
          {/* 果实 */}
          <circle cx={centerX - size * 0.08} cy={soilY - size * 0.52} r={size * 0.05} fill="#E57373" />
          <circle cx={centerX + size * 0.07} cy={soilY - size * 0.55} r={size * 0.045} fill="#EF5350" />
          <circle cx={centerX} cy={soilY - size * 0.62} r={size * 0.04} fill="#E57373" />
          {/* 叶冠 */}
          <ellipse
            cx={centerX}
            cy={soilY - size * 0.65}
            rx={size * 0.08}
            ry={size * 0.035}
            fill="url(#leafGrad)"
          />
        </g>
      )}
    </svg>
  );
}

export default function InnerPlant({ stage, size = 'md', animate = true }: InnerPlantProps) {
  const pixelSize = sizeMap[size];

  const stageLabel: Record<PlantStage, string> = {
    seed: '种子期',
    sprout: '萌芽期',
    leaf: '生长期',
    flower: '开花期',
    fruit: '结果期',
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={animate ? { scale: 0.8, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ width: pixelSize }}
      >
        <PlantSVG stage={stage} size={pixelSize} />
      </motion.div>
      {size !== 'sm' && (
        <div className="mt-2 text-sm text-soil font-medium">{stageLabel[stage]}</div>
      )}
    </div>
  );
}
