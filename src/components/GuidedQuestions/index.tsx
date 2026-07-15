/**
 * 引导提问组件
 * 三层递进式开放式问题，点击可展开"我的回答"
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, PenLine } from 'lucide-react';

interface GuidedQuestionsProps {
  questions: string[];
  color: string;
}

export default function GuidedQuestions({ questions, color }: GuidedQuestionsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
    // 简单持久化到sessionStorage
    try {
      sessionStorage.setItem(`q_answer_${index}`, value);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-serif font-semibold text-soil-dark flex items-center gap-2">
        <span
          className="w-1 h-5 rounded-full"
          style={{ backgroundColor: color }}
        />
        图画式引导 · 三层提问
      </h3>

      <div className="space-y-2.5">
        {questions.map((q, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl border border-soil/10 overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(index)}
                className="w-full text-left p-4 flex items-start gap-3 hover:bg-white/50 transition-colors"
              >
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {index + 1}
                </span>
                <p className="flex-1 text-sm text-soil-dark leading-relaxed pt-0.5">
                  {q}
                </p>
                <ChevronDown
                  size={18}
                  className="flex-shrink-0 text-gray-400 transition-transform"
                  style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4"
                >
                  <div className="ml-9">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <PenLine size={12} />
                      <span>我的回答</span>
                    </div>
                    <textarea
                      value={answers[index] || ''}
                      onChange={e => handleAnswerChange(index, e.target.value)}
                      placeholder="在这里写下你的想法……不评判对错，只是如实记录"
                      className="w-full p-3 rounded-lg border border-soil/10 bg-cream/50 text-sm text-soil resize-none focus:outline-none focus:ring-2 focus:ring-plant/30 focus:border-plant/50 transition-all"
                      rows={4}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
