/**
 * 引导提问组件
 * 三层递进式开放式问题，支持持久化保存回答和查看历史记录
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, PenLine, Clock, History } from 'lucide-react';
import { useGrowthStore } from '@/store/useGrowthStore';
import { QuestionAnswer } from '@/store/useGrowthStore';

interface GuidedQuestionsProps {
  questions: string[];
  color: string;
  topicId: number;
}

export default function GuidedQuestions({ questions, color, topicId }: GuidedQuestionsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showHistory, setShowHistory] = useState<number | null>(null);
  
  const saveAnswer = useGrowthStore(state => state.saveAnswer);
  const getAnswer = useGrowthStore(state => state.getAnswer);
  const getTopicAnswers = useGrowthStore(state => state.getTopicAnswers);

  useEffect(() => {
    const savedAnswers = getTopicAnswers(topicId);
    const initialAnswers: Record<number, string> = {};
    savedAnswers.forEach(a => {
      initialAnswers[a.questionIndex] = a.answer;
    });
    setAnswers(initialAnswers);
  }, [topicId, getTopicAnswers]);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
    saveAnswer(topicId, index, questions[index], value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const savedAnswer = (index: number): QuestionAnswer | undefined => {
    return getAnswer(topicId, index);
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
          const saved = savedAnswer(index);

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
                {saved && (
                  <div className="flex-shrink-0 flex items-center gap-1 text-xs text-gray-400">
                    <History size={12} />
                    <span>已记录</span>
                  </div>
                )}
                <ChevronDown
                  size={18}
                  className="flex-shrink-0 text-gray-400 transition-transform"
                  style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <div className="ml-9">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <PenLine size={12} />
                          <span>我的回答</span>
                        </div>
                        {saved && (
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock size={11} />
                            <span>{formatDate(saved.updatedAt)}</span>
                          </div>
                        )}
                      </div>
                      <textarea
                        value={answers[index] || ''}
                        onChange={e => handleAnswerChange(index, e.target.value)}
                        placeholder="在这里写下你的想法……不评判对错，只是如实记录"
                        className="w-full p-3 rounded-lg border border-soil/10 bg-cream/50 text-sm text-soil resize-none focus:outline-none focus:ring-2 focus:ring-plant/30 focus:border-plant/50 transition-all"
                        rows={4}
                      />
                      
                      {saved && saved.updatedAt !== saved.createdAt && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-xs text-gray-400 flex items-center gap-1"
                        >
                          <Clock size={10} />
                          <span>首次记录于 {formatDate(saved.createdAt)}</span>
                        </motion.div>
                      )}

                      {answers[index] && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-3 flex items-center gap-2 text-xs"
                        >
                          <span 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-gray-500">回答已自动保存</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
