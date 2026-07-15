/**
 * 彩虹图谱组件
 * 16道弧形色带组成半圆形彩虹，支持悬停、点击、按阶段高亮
 */

import { useState } from 'react';
import { topics, stageConfig, type Stage } from '@/data/topics';
import { useGrowthStore } from '@/store/useGrowthStore';

interface RainbowArcProps {
  activeStage?: Stage | 'all';
  onTopicClick?: (topicId: number) => void;
  size?: number;
}

export default function RainbowArc({ activeStage = 'all', onTopicClick, size = 600 }: RainbowArcProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const getTopicWaterCount = useGrowthStore(state => state.getTopicWaterCount);

  const centerX = size / 2;
  const centerY = size * 0.85;
  const maxRadius = size * 0.42;
  const bandHeight = (maxRadius - size * 0.08) / 16;

  /**
   * 生成弧形色带的SVG path
   * 从左到右的上半圆弧形
   */
  function createArcPath(outerRadius: number, innerRadius: number) {
    const startAngle = Math.PI;
    const endAngle = 0;
    const startOuterX = centerX + outerRadius * Math.cos(startAngle);
    const startOuterY = centerY + outerRadius * Math.sin(startAngle);
    const endOuterX = centerX + outerRadius * Math.cos(endAngle);
    const endOuterY = centerY + outerRadius * Math.sin(endAngle);
    const startInnerX = centerX + innerRadius * Math.cos(startAngle);
    const startInnerY = centerY + innerRadius * Math.sin(startAngle);
    const endInnerX = centerX + innerRadius * Math.cos(endAngle);
    const endInnerY = centerY + innerRadius * Math.sin(endAngle);

    return `M ${startOuterX} ${startOuterY} A ${outerRadius} ${outerRadius} 0 0 0 ${endOuterX} ${endOuterY} L ${endInnerX} ${endInnerY} A ${innerRadius} ${innerRadius} 0 0 1 ${startInnerX} ${startInnerY} Z`;
  }

  const hoveredTopic = hoveredId ? topics.find(t => t.id === hoveredId) : null;

  return (
    <div className="relative w-full max-w-[700px] mx-auto select-none">
      <svg
        viewBox={`0 0 ${size} ${size * 0.9}`}
        className="w-full h-auto"
        aria-label="生命之虹 16色成果议题图谱"
      >
        <defs>
          {topics.map(topic => (
            <filter key={`glow-${topic.id}`} id={`glow-${topic.id}`}>
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* 土壤层 */}
        <ellipse
          cx={centerX}
          cy={centerY + 10}
          rx={maxRadius + 30}
          ry={25}
          fill="url(#soilGradient)"
          opacity="0.9"
        />
        <defs>
          <linearGradient id="soilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8D6E63" />
            <stop offset="100%" stopColor="#5D4037" />
          </linearGradient>
        </defs>

        {/* 16道彩虹色带 - 从外到内排列 */}
        {topics.map((topic, index) => {
          const outerRadius = maxRadius - index * bandHeight;
          const innerRadius = outerRadius - bandHeight + 1;
          const isActive = activeStage === 'all' || topic.stage === activeStage;
          const waterCount = getTopicWaterCount(topic.id);
          const hasWatered = waterCount > 0;

          return (
            <path
              key={topic.id}
              d={createArcPath(outerRadius, innerRadius)}
              fill={topic.color}
              opacity={isActive ? (hasWatered ? 1 : 0.85) : 0.2}
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                filter: hoveredId === topic.id ? `url(#glow-${topic.id})` : 'none',
                transform: hoveredId === topic.id ? 'scale(1.02)' : 'scale(1)',
                transformOrigin: `${centerX}px ${centerY}px`,
              }}
              onMouseEnter={() => setHoveredId(topic.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onTopicClick?.(topic.id)}
            />
          );
        })}

        {/* 色带编号 */}
        {topics.map((topic, index) => {
          const radius = maxRadius - index * bandHeight - bandHeight / 2;
          const angle = Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const isActive = activeStage === 'all' || topic.stage === activeStage;
          const waterCount = getTopicWaterCount(topic.id);

          return (
            <text
              key={`num-${topic.id}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#ffffff"
              fontSize={bandHeight * 0.55}
              fontWeight="600"
              opacity={isActive ? 1 : 0.3}
              style={{ pointerEvents: 'none', paintOrder: 'stroke' }}
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="2"
              strokeLinejoin="round"
            >
              {waterCount > 0 ? `${waterCount}💧` : topic.id}
            </text>
          );
        })}
      </svg>

      {/* 悬停信息卡片 */}
      {hoveredTopic && (
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-hover border border-soil/10 pointer-events-none z-10 animate-grow"
          style={{ borderLeft: `4px solid ${hoveredTopic.color}` }}
        >
          <div className="text-sm text-gray-500 mb-0.5">
            {stageConfig[hoveredTopic.stage].ageRange} · {stageConfig[hoveredTopic.stage].label}
          </div>
          <div className="text-lg font-serif font-semibold text-soil-dark">
            色{hoveredTopic.id} {hoveredTopic.title}
          </div>
          <div className="text-sm text-gray-600 mt-0.5">{hoveredTopic.subtitle}</div>
        </div>
      )}
    </div>
  );
}
