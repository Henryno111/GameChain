'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGame, useGameActions, Question } from '@/contexts/GameContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function QuizQuestionsPage() {
  const { state } = useGame();
  const { addQuestion, updateQuestion, deleteQuestion } = useGameActions();
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [editingQuestion, setEditingQuestion] = useState<Partial<Question>>({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    difficulty: 'medium',
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const currentGame = state.currentGame;
  const questions = useMemo(() => currentGame?.questions || [], [currentGame?.questions]);
  const totalQuestions = currentGame?.questionCount || 10;

  useEffect(() => {
    if (!currentGame) {
      router.push('/dashboard');
      return;
    }
  }, [currentGame, router]);

  useEffect(() => {
    if (questions[currentQuestionIndex]) {
      setEditingQuestion(questions[currentQuestionIndex]);
      setHasUnsavedChanges(false);
    } else {
      setEditingQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        difficulty: 'medium',
      });
      setHasUnsavedChanges(false);
    }
  }, [currentQuestionIndex, questions]);

  const handleQuestionChange = (field: keyof Question, value: string | number | string[]) => {
    setEditingQuestion(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(editingQuestion.options || ['', '', '', ''])];
    newOptions[index] = value;
    handleQuestionChange('options', newOptions);
  };

  const saveCurrentQuestion = () => {
    if (!currentGame || !editingQuestion.question?.trim()) return;

    const questionData: Question = {
      id: questions[currentQuestionIndex]?.id || `question_${Date.now()}`,
      question: editingQuestion.question.trim(),
      options: editingQuestion.options || ['', '', '', ''],
      correctAnswer: editingQuestion.correctAnswer || 0,
      difficulty: editingQuestion.difficulty || 'medium',
    };

    if (questions[currentQuestionIndex]) {
      updateQuestion(currentGame.id, questionData.id, questionData);
    } else {
      addQuestion(currentGame.id, questionData);
    }
    
    setHasUnsavedChanges(false);
  };

  const deleteCurrentQuestion = () => {
    if (!currentGame || !questions[currentQuestionIndex]) return;
    
    deleteQuestion(currentGame.id, questions[currentQuestionIndex].id);
    
    if (currentQuestionIndex >= questions.length - 1 && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index: number) => {
    if (hasUnsavedChanges) {
      const shouldSave = confirm('You have unsaved changes. Do you want to save them?');
      if (shouldSave) {
        saveCurrentQuestion();
      }
    }
    setCurrentQuestionIndex(index);
  };

  const handleFinishSetup = () => {
    if (hasUnsavedChanges) {
      saveCurrentQuestion();
    }
    
    if (questions.length === 0) {
      alert('Please add at least one question before finishing setup.');
      return;
    }
    
    router.push('/dashboard');
  };

  if (!currentGame) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gamechain-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground cyber-text mb-2">
              Create Questions
            </h1>
            <p className="text-muted-foreground">
              Game: {currentGame.title} • Code: <span className="font-mono text-gamechain-accent">{currentGame.code}</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Question Navigator */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-card border border-gamechain-outline rounded-xl p-6 sticky top-8">
                <h3 className="font-semibold text-foreground mb-4">Questions ({questions.length}/{totalQuestions})</h3>
                
                <div className="grid grid-cols-5 lg:grid-cols-2 gap-2">
                  {Array.from({ length: totalQuestions }, (_, index) => {
                    const hasQuestion = questions[index];
                    const isActive = index === currentQuestionIndex;
                    
                    return (
                      <motion.button
                        key={index}
                        onClick={() => goToQuestion(index)}
                        className={`
                          aspect-square flex items-center justify-center rounded-lg border-2 font-semibold text-sm transition-all
                          ${isActive
                            ? 'border-gamechain-primary bg-gamechain-primary/20 text-gamechain-primary'
                            : hasQuestion
                              ? 'border-gamechain-accent bg-gamechain-accent/20 text-gamechain-accent'
                              : 'border-gamechain-outline bg-background text-muted-foreground hover:border-gamechain-primary/50'
                          }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {index + 1}
                        {hasQuestion && !isActive && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gamechain-accent rounded-full"></div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gamechain-outline">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="text-foreground">{Math.round((questions.length / totalQuestions) * 100)}%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-gamechain-primary to-gamechain-secondary h-2 rounded-full transition-all"
                        style={{ width: `${(questions.length / totalQuestions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Question Editor */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-card border border-gamechain-outline rounded-xl p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Question {currentQuestionIndex + 1}
                  </h2>
                  {questions[currentQuestionIndex] && (
                    <button
                      onClick={deleteCurrentQuestion}
                      className="text-red-500 hover:text-red-600 transition-colors p-2"
                      title="Delete question"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Question Input */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Question
                    </label>
                    <textarea
                      value={editingQuestion.question || ''}
                      onChange={(e) => handleQuestionChange('question', e.target.value)}
                      placeholder="Enter your question here..."
                      className="w-full px-4 py-3 bg-input border border-gamechain-outline rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:border-transparent transition-all min-h-[100px] resize-y"
                    />
                  </div>

                  {/* Answer Options */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-4">
                      Answer Options
                    </label>
                    <div className="space-y-3">
                      {(editingQuestion.options || ['', '', '', '']).map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={editingQuestion.correctAnswer === index}
                              onChange={() => handleQuestionChange('correctAnswer', index)}
                              className="w-4 h-4 text-gamechain-primary focus:ring-gamechain-primary border-gamechain-outline"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
                              placeholder={`Option ${index + 1}`}
                              className="w-full px-4 py-3 bg-input border border-gamechain-outline rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:border-transparent transition-all"
                            />
                          </div>
                          <div className="text-xs text-muted-foreground min-w-[20px]">
                            {String.fromCharCode(65 + index)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Select the correct answer option by clicking the radio button
                    </p>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Difficulty
                    </label>
                    <select
                      value={editingQuestion.difficulty || 'medium'}
                      onChange={(e) => handleQuestionChange('difficulty', e.target.value as 'easy' | 'medium' | 'hard')}
                      className="px-4 py-3 bg-input border border-gamechain-outline rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-gamechain-primary focus:border-transparent transition-all"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-gamechain-outline">
                    <motion.button
                      onClick={saveCurrentQuestion}
                      disabled={!editingQuestion.question?.trim()}
                      className={`
                        px-6 py-3 rounded-lg font-medium transition-all
                        ${!editingQuestion.question?.trim()
                          ? 'bg-muted text-muted-foreground cursor-not-allowed'
                          : hasUnsavedChanges
                            ? 'bg-gamechain-accent text-white hover:opacity-90'
                            : 'bg-gamechain-primary text-white hover:opacity-90'
                        }
                      `}
                      whileHover={editingQuestion.question?.trim() ? { scale: 1.02 } : {}}
                      whileTap={editingQuestion.question?.trim() ? { scale: 0.98 } : {}}
                    >
                      {hasUnsavedChanges ? 'Save Changes' : 'Saved'}
                    </motion.button>

                    <motion.button
                      onClick={handleFinishSetup}
                      className="px-6 py-3 bg-gradient-to-r from-gamechain-primary to-gamechain-secondary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Finish Setup
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}