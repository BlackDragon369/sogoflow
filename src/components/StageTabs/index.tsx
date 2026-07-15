/**
 * 阶段切换标签组件
 * 四个年龄段的胶囊按钮切换
 */

import { stageConfig, type Stage } from '@/data/topics';

interface StageTabsProps {
  activeStage: Stage | 'all';
  onChange: (stage: Stage | 'all') => void;
}

const stages: { key: Stage | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'youth', label: `${stageConfig.youth.ageRange} ${stageConfig.youth.label}` },
  { key: 'middle', label: `${stageConfig.middle.ageRange} ${stageConfig.middle.label}` },
  { key: 'mature', label: `${stageConfig.mature.ageRange} ${stageConfig.mature.label}` },
  { key: 'wisdom', label: `${stageConfig.wisdom.ageRange} ${stageConfig.wisdom.label}` },
];

export default function StageTabs({ activeStage, onChange }: StageTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {stages.map(stage => {
        const isActive = activeStage === stage.key;
        const stageColor = stage.key === 'all' ? '#5D4037' : stageConfig[stage.key].color;

        return (
          <button
            key={stage.key}
            onClick={() => onChange(stage.key)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border"
            style={{
              backgroundColor: isActive ? stageColor : 'rgba(255, 255, 255, 0.7)',
              color: isActive ? '#ffffff' : '#5D4037',
              borderColor: isActive ? stageColor : 'rgba(93, 64, 55, 0.2)',
              boxShadow: isActive ? '0 4px 12px rgba(93, 64, 55, 0.2)' : 'none',
            }}
          >
            {stage.label}
          </button>
        );
      })}
    </div>
  );
}
