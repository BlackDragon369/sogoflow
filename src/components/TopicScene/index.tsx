/**
 * 议题可视化场景组件
 * 每个议题有独特的SVG意象画面
 * 场景类型：beach(海滩)、tree(树木)、well(老井)、river(河流)、mountain(山峦)、garden(花园)、path(小径)、light(光)
 */

import { motion } from 'framer-motion';
import type { SceneType } from '@/data/topics';

interface TopicSceneProps {
  scene: SceneType;
  color: string;
  title: string;
}

/**
 * 海滩场景 - 自我超越/新职业
 */
function BeachScene({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCE4EC" />
          <stop offset="60%" stopColor="#FFE0B2" />
          <stop offset="100%" stopColor="#FFCC80" />
        </linearGradient>
        <linearGradient id="sea" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#80DEEA" />
          <stop offset="100%" stopColor="#4DD0E1" />
        </linearGradient>
        <linearGradient id="sand" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE0B2" />
          <stop offset="100%" stopColor="#FFCC80" />
        </linearGradient>
      </defs>
      {/* 天空 */}
      <rect width="600" height="180" fill="url(#sky)" />
      {/* 太阳 */}
      <circle cx="450" cy="80" r="35" fill="#FFD54F" opacity="0.8" />
      {/* 海 */}
      <path d="M 0 180 Q 150 170 300 180 T 600 180 L 600 220 L 0 220 Z" fill="url(#sea)" />
      {/* 波浪 */}
      <path d="M 0 190 Q 100 185 200 192 T 400 190 T 600 192" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
      <path d="M 0 200 Q 80 196 160 202 T 320 200 T 600 202" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
      {/* 沙滩 */}
      <path d="M 0 220 Q 300 210 600 225 L 600 300 L 0 300 Z" fill="url(#sand)" />
      {/* 脚印 */}
      <g opacity="0.3">
        {[...Array(8)].map((_, i) => (
          <ellipse
            key={i}
            cx={80 + i * 60}
            cy={250 + Math.sin(i) * 5}
            rx="6"
            ry="10"
            fill={color}
            transform={`rotate(${i * 5 - 20} ${80 + i * 60} ${250 + Math.sin(i) * 5})`}
          />
        ))}
      </g>
      {/* 人物背影 */}
      <g transform="translate(150, 220)">
        <circle cx="0" cy="-30" r="8" fill="#5D4037" />
        <path d="M -6 -22 Q -8 -5 -10 0 L 10 0 Q 8 -5 6 -22 Z" fill={color} opacity="0.7" />
        <line x1="-5" y1="0" x2="-8" y2="20" stroke="#5D4037" strokeWidth="3" />
        <line x1="5" y1="0" x2="8" y2="20" stroke="#5D4037" strokeWidth="3" />
      </g>
    </svg>
  );
}

/**
 * 树木场景 - 家庭代际/抗挫韧性
 */
function TreeScene({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="treeSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8F5E9" />
          <stop offset="100%" stopColor="#C8E6C9" />
        </linearGradient>
        <linearGradient id="cliff" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A1887F" />
          <stop offset="50%" stopColor="#8D6E63" />
          <stop offset="100%" stopColor="#6D4C41" />
        </linearGradient>
        <radialGradient id="treeCrown" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="100%" stopColor="#4CAF50" />
        </radialGradient>
      </defs>
      {/* 天空 */}
      <rect width="600" height="250" fill="url(#treeSky)" />
      {/* 远山 */}
      <path d="M 0 180 L 100 140 L 200 170 L 320 130 L 450 160 L 600 145 L 600 250 L 0 250 Z" fill="#A5D6A7" opacity="0.5" />
      {/* 悬崖 */}
      <path d="M 200 250 L 220 180 L 400 175 L 420 250 Z" fill="url(#cliff)" />
      {/* 树根 - 深入石缝 */}
      <g>
        <path d="M 300 240 Q 290 260 280 280" fill="none" stroke="#5D4037" strokeWidth="4" />
        <path d="M 310 245 Q 320 265 330 280" fill="none" stroke="#5D4037" strokeWidth="3" />
        <path d="M 305 250 Q 295 270 290 285" fill="none" stroke="#6D4C41" strokeWidth="2.5" />
      </g>
      {/* 树干 */}
      <path
        d="M 305 230 Q 300 180 310 140 Q 320 100 305 70"
        fill="none"
        stroke="#6D4C41"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 305 230 Q 300 180 310 140 Q 320 100 305 70"
        fill="none"
        stroke="#8D6E63"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* 节瘤 - 挫折的痕迹 */}
      <circle cx="305" cy="150" r="8" fill="#5D4037" opacity="0.8" />
      <circle cx="315" cy="120" r="5" fill="#5D4037" opacity="0.6" />
      {/* 树冠 */}
      <ellipse cx="280" cy="80" rx="45" ry="35" fill="url(#treeCrown)" />
      <ellipse cx="330" cy="60" rx="50" ry="40" fill="url(#treeCrown)" />
      <ellipse cx="300" cy="40" rx="40" ry="30" fill="url(#treeCrown)" />
      {/* 新芽 */}
      <circle cx="305" cy="35" r="6" fill="#A5D6A7" />
      {/* 小鸟 */}
      <g transform="translate(370, 90)">
        <path d="M 0 0 Q 5 -8 10 0 Q 5 -3 0 0" fill={color} />
      </g>
    </svg>
  );
}

/**
 * 老井场景 - 深化精通/智慧沉淀
 */
function WellScene({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wellSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E3F2FD" />
          <stop offset="100%" stopColor="#BBDEFB" />
        </linearGradient>
        <radialGradient id="wellWater" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#90CAF9" />
          <stop offset="100%" stopColor="#1565C0" />
        </radialGradient>
      </defs>
      {/* 天空 */}
      <rect width="600" height="200" fill="url(#wellSky)" />
      {/* 地 */}
      <rect y="200" width="600" height="100" fill="#A1887F" />
      <ellipse cx="300" cy="200" rx="500" ry="20" fill="#8D6E63" opacity="0.3" />
      {/* 井身 */}
      <g>
        {/* 井壁外沿 */}
        <ellipse cx="300" cy="200" rx="90" ry="20" fill="#6D4C41" />
        {/* 井口 */}
        <ellipse cx="300" cy="195" rx="70" ry="14" fill="url(#wellWater)" />
        {/* 水面倒影 */}
        <ellipse cx="300" cy="193" rx="50" ry="8" fill="white" opacity="0.3" />
        {/* 井壁石砖 */}
        <g opacity="0.5">
          {[...Array(5)].map((_, i) => (
            <rect
              key={i}
              x={220 + i * 32}
              y="178"
              width="28"
              height="18"
              rx="2"
              fill="none"
              stroke="#5D4037"
              strokeWidth="1"
            />
          ))}
        </g>
      </g>
      {/* 打水的人 */}
      <g transform="translate(400, 170)">
        <circle cx="0" cy="-20" r="7" fill="#5D4037" />
        <path d="M -5 -13 Q -7 0 -5 10 L 5 10 Q 7 0 5 -13 Z" fill={color} opacity="0.7" />
        {/* 绳子 */}
        <line x1="5" y1="-5" x2="-50" y2="0" stroke="#8D6E63" strokeWidth="1.5" />
        {/* 水桶 */}
        <g transform="translate(-60, 5)">
          <path d="M -8 0 L -6 15 L 6 15 L 8 0 Z" fill="#8D6E63" />
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#6D4C41" strokeWidth="1.5" />
        </g>
      </g>
      {/* 旁边的植物 */}
      <g transform="translate(180, 195)">
        <path d="M 0 0 Q -2 -15 0 -25" fill="none" stroke="#66BB6A" strokeWidth="2" />
        <ellipse cx="-5" cy="-20" rx="8" ry="3" fill="#81C784" transform="rotate(-30 -5 -20)" />
        <ellipse cx="5" cy="-22" rx="7" ry="2.5" fill="#81C784" transform="rotate(25 5 -22)" />
      </g>
    </svg>
  );
}

/**
 * 河流场景 - 社会贡献/圆融流动
 */
function RiverScene({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="riverSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F3E5F5" />
          <stop offset="100%" stopColor="#E1BEE7" />
        </linearGradient>
        <linearGradient id="riverWater" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#81D4FA" />
          <stop offset="50%" stopColor="#4FC3F7" />
          <stop offset="100%" stopColor="#29B6F6" />
        </linearGradient>
      </defs>
      {/* 天空 */}
      <rect width="600" height="150" fill="url(#riverSky)" />
      {/* 远山 */}
      <path d="M 0 150 L 80 100 L 180 130 L 280 90 L 400 120 L 520 100 L 600 130 L 600 150 Z" fill="#CE93D8" opacity="0.4" />
      {/* 两岸绿地 */}
      <path d="M 0 150 L 150 155 L 250 170 L 350 165 L 450 175 L 600 170 L 600 300 L 0 300 Z" fill="#A5D6A7" opacity="0.6" />
      {/* 河流 */}
      <path
        d="M -20 160 Q 100 180 200 170 Q 300 160 400 180 Q 500 190 620 175 L 620 250 Q 500 270 400 260 Q 300 250 200 265 Q 100 275 -20 255 Z"
        fill="url(#riverWater)"
        opacity="0.8"
      />
      {/* 河流波纹 */}
      <path
        d="M 50 200 Q 120 195 200 205 T 350 200 T 550 205"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path
        d="M 80 220 Q 160 215 240 225 T 400 220 T 580 225"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.3"
      />
      {/* 村庄 - 河的上游 */}
      <g transform="translate(80, 155)">
        <rect x="0" y="-12" width="12" height="12" fill="#FFCC80" />
        <polygon points="0,-12 6,-20 12,-12" fill={color} opacity="0.6" />
      </g>
      {/* 田野 */}
      <g transform="translate(480, 175)" opacity="0.7">
        <rect x="0" y="0" width="20" height="12" fill="#C5E1A5" />
        <rect x="22" y="0" width="20" height="12" fill="#AED581" />
        <rect x="44" y="0" width="15" height="12" fill="#C5E1A5" />
      </g>
      {/* 入海口光晕 */}
      <circle cx="580" cy="215" r="50" fill="white" opacity="0.2" />
    </svg>
  );
}

/**
 * 山峦场景 - 新职业/边界拓展
 */
function MountainScene({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mtnSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8EAF6" />
          <stop offset="100%" stopColor="#C5CAE9" />
        </linearGradient>
      </defs>
      {/* 天空 */}
      <rect width="600" height="300" fill="url(#mtnSky)" />
      {/* 远山 */}
      <path d="M 0 200 L 100 120 L 200 180 L 300 80 L 400 160 L 500 100 L 600 180 L 600 300 L 0 300 Z" fill="#9FA8DA" opacity="0.5" />
      {/* 中景山脉 */}
      <path d="M 0 230 L 80 170 L 180 210 L 280 140 L 380 190 L 480 150 L 600 210 L 600 300 L 0 300 Z" fill="#7986CB" opacity="0.6" />
      {/* 主峰 */}
      <path d="M 200 300 L 300 100 L 400 300 Z" fill="#5C6BC0" />
      {/* 雪顶 */}
      <path d="M 270 160 L 300 100 L 330 160 Z" fill="white" opacity="0.8" />
      {/* 大路 */}
      <path
        d="M 50 300 Q 150 280 200 260 Q 250 240 280 220"
        fill="none"
        stroke="#D7CCC8"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* 小径 - 未知道路 */}
      <path
        d="M 280 220 Q 300 200 310 180 Q 320 160 325 140 Q 328 130 320 110"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity="0.7"
      />
      {/* 登山者 */}
      <g transform="translate(280, 215)">
        <circle cx="0" cy="-8" r="4" fill="#5D4037" />
        <rect x="-4" y="-4" width="8" height="10" rx="2" fill={color} />
      </g>
      {/* 旗帜在山顶 */}
      <g transform="translate(300, 100)">
        <line x1="0" y1="0" x2="0" y2="-25" stroke="#5D4037" strokeWidth="2" />
        <path d="M 0 -25 L 15 -20 L 0 -15 Z" fill={color} />
      </g>
      {/* 云 */}
      <g opacity="0.6">
        <ellipse cx="150" cy="60" rx="35" ry="12" fill="white" />
        <ellipse cx="450" cy="80" rx="40" ry="14" fill="white" />
      </g>
    </svg>
  );
}

/**
 * 花园场景 - 技能培养/生活目标/个人特色
 */
function GardenScene({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="gardenSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="100%" stopColor="#DCEDC8" />
        </linearGradient>
      </defs>
      {/* 天空 */}
      <rect width="600" height="180" fill="url(#gardenSky)" />
      {/* 草地 */}
      <rect y="180" width="600" height="120" fill="#81C784" />
      <ellipse cx="300" cy="180" rx="600" ry="25" fill="#A5D6A7" opacity="0.5" />
      {/* 苗圃边界 */}
      <rect x="100" y="210" width="400" height="60" rx="4" fill="#8D6E63" opacity="0.6" />
      <rect x="105" y="215" width="390" height="50" rx="3" fill="#A1887F" opacity="0.5" />
      {/* 各种花/植物 */}
      {/* 已盛开的花 */}
      <g transform="translate(140, 240)">
        <line x1="0" y1="0" x2="0" y2="-35" stroke="#66BB6A" strokeWidth="2" />
        {[0, 72, 144, 216, 288].map(a => (
          <ellipse
            key={a}
            cx="0"
            cy="-42"
            rx="4"
            ry="8"
            fill={color}
            transform={`rotate(${a} 0 -42)`}
            opacity="0.9"
          />
        ))}
        <circle cx="0" cy="-42" r="3" fill="#FFD54F" />
      </g>
      {/* 生长中的花 */}
      <g transform="translate(200, 240)">
        <line x1="0" y1="0" x2="0" y2="-25" stroke="#66BB6A" strokeWidth="2" />
        <ellipse cx="-4" cy="-18" rx="7" ry="3" fill="#81C784" transform="rotate(-25 -4 -18)" />
        <ellipse cx="4" cy="-22" rx="6" ry="2.5" fill="#81C784" transform="rotate(25 4 -22)" />
        <circle cx="0" cy="-28" r="4" fill="#A5D6A7" />
      </g>
      {/* 种子 */}
      <g transform="translate(260, 240)">
        <ellipse cx="0" cy="-3" rx="4" ry="6" fill="#A1887F" />
      </g>
      {/* 刚发芽 */}
      <g transform="translate(300, 240)">
        <line x1="0" y1="0" x2="0" y2="-12" stroke="#81C784" strokeWidth="1.5" />
        <ellipse cx="-3" cy="-10" rx="4" ry="2" fill="#A5D6A7" transform="rotate(-20 -3 -10)" />
        <ellipse cx="3" cy="-11" rx="3.5" ry="1.8" fill="#A5D6A7" transform="rotate(20 3 -11)" />
      </g>
      {/* 大一点的苗 */}
      <g transform="translate(350, 240)">
        <line x1="0" y1="0" x2="0" y2="-18" stroke="#66BB6A" strokeWidth="2" />
        <ellipse cx="-5" cy="-12" rx="6" ry="2.5" fill="#81C784" transform="rotate(-30 -5 -12)" />
        <ellipse cx="5" cy="-15" rx="6" ry="2.5" fill="#81C784" transform="rotate(25 5 -15)" />
      </g>
      {/* 浇水壶 */}
      <g transform="translate(480, 210)">
        <ellipse cx="0" cy="20" rx="20" ry="8" fill="#90A4AE" opacity="0.6" />
        <path d="M -18 20 Q -20 0 0 -5 Q 20 0 18 20 Z" fill="#B0BEC5" />
        <path d="M 15 5 L 30 -5 L 32 -3 L 18 8 Z" fill="#90A4AE" />
        {/* 水滴 */}
        <g>
          <ellipse cx="28" cy="0" rx="2" ry="3" fill="#81D4FA" />
          <ellipse cx="35" cy="5" rx="1.5" ry="2.5" fill="#81D4FA" opacity="0.7" />
          <ellipse cx="42" cy="10" rx="1" ry="2" fill="#81D4FA" opacity="0.5" />
        </g>
      </g>
      {/* 蝴蝶 */}
      <g transform="translate(380, 180)">
        <ellipse cx="-4" cy="0" rx="6" ry="10" fill={color} opacity="0.8" transform="rotate(-20 -4 0)" />
        <ellipse cx="4" cy="0" rx="6" ry="10" fill={color} opacity="0.8" transform="rotate(20 4 0)" />
        <ellipse cx="0" cy="0" rx="1.5" ry="8" fill="#5D4037" />
      </g>
    </svg>
  );
}

/**
 * 小径场景 - 人文同情/跨代连接
 */
function PathScene({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pathSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFCCBC" />
          <stop offset="100%" stopColor="#FFAB91" />
        </linearGradient>
      </defs>
      {/* 天空 */}
      <rect width="600" height="200" fill="url(#pathSky)" />
      {/* 树林背景 */}
      <g opacity="0.4">
        {[...Array(12)].map((_, i) => (
          <g key={i} transform={`translate(${30 + i * 50}, 180)`}>
            <rect x="-3" y="0" width="6" height="25" fill="#6D4C41" />
            <circle cx="0" cy="-10" r="18" fill="#66BB6A" />
          </g>
        ))}
      </g>
      {/* 地面 */}
      <rect y="200" width="600" height="100" fill="#8D6E63" opacity="0.4" />
      {/* 小径 */}
      <path
        d="M -20 260 Q 100 250 200 240 Q 300 230 400 240 Q 500 250 620 240 L 620 280 Q 500 290 400 280 Q 300 270 200 280 Q 100 290 -20 280 Z"
        fill="#D7CCC8"
        opacity="0.9"
      />
      {/* 窄桥 */}
      <g transform="translate(280, 235)">
        <rect x="0" y="0" width="60" height="8" rx="2" fill="#8D6E63" />
        <line x1="0" y1="4" x2="60" y2="4" stroke="#6D4C41" strokeWidth="0.5" opacity="0.5" />
      </g>
      {/* 对面来人 */}
      <g transform="translate(360, 230)">
        <circle cx="0" cy="-22" r="6" fill="#37474F" />
        <path d="M -5 -16 Q -6 -2 -4 8 L 4 8 Q 6 -2 5 -16 Z" fill={color} opacity="0.6" />
      </g>
      {/* 自己 */}
      <g transform="translate(220, 232)">
        <circle cx="0" cy="-24" r="6" fill="#5D4037" />
        <path d="M -5 -18 Q -6 -4 -4 6 L 4 6 Q 6 -4 5 -18 Z" fill="#66BB6A" opacity="0.8" />
      </g>
      {/* 路边的花 */}
      <g transform="translate(150, 255)">
        <circle cx="0" cy="0" r="3" fill="#F48FB1" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#66BB6A" strokeWidth="1" />
      </g>
      <g transform="translate(450, 258)">
        <circle cx="0" cy="0" r="3" fill="#CE93D8" />
        <line x1="0" y1="0" x2="0" y2="6" stroke="#66BB6A" strokeWidth="1" />
      </g>
    </svg>
  );
}

/**
 * 光场景 - 回归本真
 */
function LightScene({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="lightBg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#FFF8E1" />
          <stop offset="100%" stopColor="#FFE0B2" />
        </radialGradient>
        <radialGradient id="centerLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.8" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* 背景 */}
      <rect width="600" height="300" fill="url(#lightBg)" />
      {/* 中心光晕 */}
      <circle cx="300" cy="150" r="120" fill="url(#centerLight)" />
      {/* 光线 */}
      <g opacity="0.4">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 300 + Math.cos(angle) * 50;
          const y1 = 150 + Math.sin(angle) * 50;
          const x2 = 300 + Math.cos(angle) * 180;
          const y2 = 150 + Math.sin(angle) * 180;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth="2"
              opacity="0.3"
            />
          );
        })}
      </g>
      {/* 身份标签掉落在地上 */}
      <g transform="translate(300, 250)">
        {['经理', '妈妈', '员工', '朋友'].map((label, i) => (
          <g key={i} transform={`rotate(${(i - 1.5) * 15}) translate(${i * 35 - 50}, ${Math.sin(i) * 5})`}>
            <rect x="-20" y="-8" width="40" height="16" rx="3" fill="white" opacity="0.6" />
            <text x="0" y="3" textAnchor="middle" fontSize="9" fill="#5D4037" opacity="0.7">
              {label}
            </text>
          </g>
        ))}
      </g>
      {/* 中心的纯粹自我 - 一个光点 */}
      <circle cx="300" cy="150" r="15" fill="white" opacity="0.9" />
      <circle cx="300" cy="150" r="8" fill={color} opacity="0.6" />
      <circle cx="300" cy="150" r="4" fill="white" />
      {/* 漂浮的光点 */}
      <g>
        {[
          { x: 150, y: 80, size: 3 },
          { x: 480, y: 100, size: 2.5 },
          { x: 100, y: 200, size: 2 },
          { x: 500, y: 220, size: 3 },
          { x: 200, y: 260, size: 2 },
          { x: 420, y: 60, size: 2.5 },
        ].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.size} fill="white" opacity="0.7">
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${3 + i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    </svg>
  );
}

const sceneMap: Record<SceneType, (props: { color: string }) => JSX.Element> = {
  beach: BeachScene,
  tree: TreeScene,
  well: WellScene,
  river: RiverScene,
  mountain: MountainScene,
  garden: GardenScene,
  path: PathScene,
  light: LightScene,
};

export default function TopicScene({ scene, color, title }: TopicSceneProps) {
  const SceneComponent = sceneMap[scene];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full overflow-hidden rounded-2xl shadow-soft"
      style={{ aspectRatio: '2/1' }}
    >
      <SceneComponent color={color} />

      {/* 渐变遮罩 - 底部过渡到卡片 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(255,248,231,0.9) 0%, transparent 100%)',
        }}
      />

      {/* 标题叠加 */}
      <div className="absolute top-4 left-4 right-4">
        <div
          className="inline-block px-3 py-1 rounded-full text-xs text-white font-medium"
          style={{ backgroundColor: color }}
        >
          {title}
        </div>
      </div>
    </motion.div>
  );
}
