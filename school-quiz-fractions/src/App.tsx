import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Lightbulb,
  LayoutGrid,
  ArrowRightLeft,
  AlertTriangle,
  BrickWall,
  Languages
} from 'lucide-react';
import { quizData, Question } from './data/quizData';
import { LegoPlate } from './components/LegoPlate';

type Language = 'ru' | 'en';

const translations = {
  ru: {
    title: "LEGO Math Quiz",
    subtitle: "Дроби, Десятичные и Проценты — это одно и то же!",
    introDesc: "Представь пластину ЛЕГО на 100 точек. Это наше \"всё\". Любое число можно назвать тремя способами. Давай проверим, как ты в этом разбираешься!",
    visual: "Визуализация",
    visualDesc: "Считаем точки на пластине",
    conversion: "Перевод",
    conversionDesc: "Меняем форму числа",
    mistake: "Ошибки",
    mistakeDesc: "Ищем ловушки",
    startBtn: "Начать квиз!",
    cheatSheet: "Шпаргалка",
    fraction: "Дробь",
    decimal: "Десятичное",
    percent: "Процент",
    meaning: "Смысл",
    meanings: {
      oneTenth: "Одна часть из десяти",
      quarter: "Четверть",
      half: "Половина",
      threeQuarters: "Три четверти",
      fourFifths: "Четыре из пяти"
    },
    nextBtn: "Следующий вопрос",
    resultBtn: "Посмотреть результат",
    correct: "Правильно! 🧱",
    incorrect: "Не совсем... 🏗️",
    quizFinished: "Квиз пройден!",
    masterDesc: "Ты настоящий мастер ЛЕГО-математики!",
    correctLabel: "Верно",
    totalLabel: "Всего",
    retryBtn: "Попробовать снова",
    footer: "Помни: Дробь, десятичное и процент — это как три имени одного и того же лего-кирпичика!",
    results: {
      perfect: "Невероятно! Ты знаешь всё о дробях и процентах! 🌟",
      good: "Отличный результат! Еще немного практики, и ты станешь гуру! 💪",
      start: "Хорошее начало! Попробуй еще раз, чтобы запомнить все правила! 🧱"
    },
    types: {
      visual: "Визуализация",
      conversion: "Перевод",
      mistake: "Найди ошибку"
    }
  },
  en: {
    title: "LEGO Math Quiz",
    subtitle: "Fractions, Decimals, and Percentages — they are the same thing!",
    introDesc: "Imagine a LEGO plate with 100 studs. This is our \"whole\". Any number can be named in three ways. Let's check how well you understand this!",
    visual: "Visualization",
    visualDesc: "Counting studs on the plate",
    conversion: "Conversion",
    conversionDesc: "Changing the number form",
    mistake: "Mistakes",
    mistakeDesc: "Finding traps",
    startBtn: "Start Quiz!",
    cheatSheet: "Cheat Sheet",
    fraction: "Fraction",
    decimal: "Decimal",
    percent: "Percent",
    meaning: "Meaning",
    meanings: {
      oneTenth: "One part of ten",
      quarter: "Quarter",
      half: "Half",
      threeQuarters: "Three quarters",
      fourFifths: "Four out of five"
    },
    nextBtn: "Next Question",
    resultBtn: "See Result",
    correct: "Correct! 🧱",
    incorrect: "Not quite... 🏗️",
    quizFinished: "Quiz Finished!",
    masterDesc: "You are a true LEGO Math Master!",
    correctLabel: "Correct",
    totalLabel: "Total",
    retryBtn: "Try Again",
    footer: "Remember: Fraction, decimal, and percent are like three names for the same LEGO brick!",
    results: {
      perfect: "Incredible! You know everything about fractions and percentages! 🌟",
      good: "Great result! A little more practice and you'll become a guru! 💪",
      start: "Good start! Try again to remember all the rules! 🧱"
    },
    types: {
      visual: "Visualization",
      conversion: "Conversion",
      mistake: "Find the Mistake"
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const t = translations[lang];
  const currentQuestion = quizData[currentQuestionIndex];

  const handleStart = () => {
    setCurrentStep('quiz');
    setCurrentQuestionIndex(0);
    setScore(0);
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setSelectedOptionIndex(null);
    setIsCorrect(null);
    setShowExplanation(false);
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOptionIndex !== null) return;
    
    setSelectedOptionIndex(index);
    const correct = index === currentQuestion.correctAnswerIndex;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      setCurrentStep('result');
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'ru' ? 'en' : 'ru');
  };

  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-lego-yellow/30">
      {/* Header */}
      <header className="bg-lego-yellow p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-lego-red p-2 rounded-lg shadow-brick">
              <BrickWall className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter text-lego-blue">
              {t.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 bg-white/50 hover:bg-white px-3 py-1.5 rounded-full text-sm font-bold text-lego-blue transition-colors"
            >
              <Languages size={16} />
              {lang === 'ru' ? 'RU' : 'EN'}
            </button>
            {currentStep === 'quiz' && (
              <div className="text-lego-blue font-bold">
                {currentQuestionIndex + 1} / {quizData.length}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-lego-yellow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <LayoutGrid size={120} />
                </div>
                
                <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
                  {t.subtitle.split(' — ')[0]} — <br/>
                  <span className="text-lego-red">{t.subtitle.split(' — ')[1]}</span>
                </h2>
                
                <p className="text-lg text-slate-600 mb-8 max-w-2xl">
                  {t.introDesc}
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-lego-blue/10 p-4 rounded-2xl border-2 border-lego-blue/20">
                    <LayoutGrid className="text-lego-blue mb-2" />
                    <h3 className="font-bold text-lego-blue">{t.visual}</h3>
                    <p className="text-sm text-slate-600">{t.visualDesc}</p>
                  </div>
                  <div className="bg-lego-red/10 p-4 rounded-2xl border-2 border-lego-red/20">
                    <ArrowRightLeft className="text-lego-red mb-2" />
                    <h3 className="font-bold text-lego-red">{t.conversion}</h3>
                    <p className="text-sm text-slate-600">{t.conversionDesc}</p>
                  </div>
                  <div className="bg-lego-green/10 p-4 rounded-2xl border-2 border-lego-green/20">
                    <AlertTriangle className="text-lego-green mb-2" />
                    <h3 className="font-bold text-lego-green">{t.mistake}</h3>
                    <p className="text-sm text-slate-600">{t.mistakeDesc}</p>
                  </div>
                </div>

                <button
                  onClick={handleStart}
                  className="w-full sm:w-auto bg-lego-red hover:bg-red-600 text-white font-black py-4 px-12 rounded-2xl text-xl shadow-brick transition-all active:translate-y-1 active:shadow-none uppercase tracking-widest"
                >
                  {t.startBtn}
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Progress Bar */}
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-lego-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-slate-100">
                <div className="flex flex-col md:flex-row gap-8">
                  {currentQuestion.type === 'visual' && (
                    <div className="flex-shrink-0 flex justify-center">
                      <LegoPlate count={currentQuestion.legoCount || 0} />
                    </div>
                  )}
                  
                  <div className="flex-grow space-y-6">
                    <div className="space-y-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        currentQuestion.type === 'visual' ? 'bg-lego-blue/10 text-lego-blue' :
                        currentQuestion.type === 'conversion' ? 'bg-lego-red/10 text-lego-red' :
                        'bg-lego-green/10 text-lego-green'
                      }`}>
                        {t.types[currentQuestion.type]}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-800">
                        {currentQuestion.question[lang]}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentQuestion.options[lang].map((option, index) => {
                        const isSelected = selectedOptionIndex === index;
                        const isCorrectOption = index === currentQuestion.correctAnswerIndex;
                        
                        let btnClass = "p-4 rounded-2xl border-2 font-bold text-lg transition-all text-left flex justify-between items-center ";
                        
                        if (selectedOptionIndex === null) {
                          btnClass += "border-slate-200 hover:border-lego-yellow hover:bg-lego-yellow/5 bg-white";
                        } else {
                          if (isCorrectOption) {
                            btnClass += "border-lego-green bg-lego-green/10 text-lego-green";
                          } else if (isSelected) {
                            btnClass += "border-lego-red bg-lego-red/10 text-lego-red";
                          } else {
                            btnClass += "border-slate-100 bg-slate-50 text-slate-400";
                          }
                        }

                        return (
                          <button
                            key={index}
                            onClick={() => handleOptionSelect(index)}
                            disabled={selectedOptionIndex !== null}
                            className={btnClass}
                          >
                            {option}
                            {selectedOptionIndex !== null && isCorrectOption && <CheckCircle2 className="w-5 h-5" />}
                            {selectedOptionIndex !== null && isSelected && !isCorrectOption && <XCircle className="w-5 h-5" />}
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className={`p-4 rounded-2xl border-l-4 ${
                            isCorrect ? 'bg-green-50 border-lego-green text-green-800' : 'bg-red-50 border-lego-red text-red-800'
                          }`}
                        >
                          <p className="font-bold flex items-center gap-2 mb-1">
                            {isCorrect ? t.correct : t.incorrect}
                          </p>
                          <p className="text-sm opacity-90">{currentQuestion.explanation[lang]}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {selectedOptionIndex !== null && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={handleNext}
                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors"
                      >
                        {currentQuestionIndex === quizData.length - 1 ? t.resultBtn : t.nextBtn}
                        <ChevronRight size={20} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="bg-white p-12 rounded-3xl shadow-2xl border-4 border-lego-yellow relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-lego-yellow p-4 rounded-full shadow-lg">
                  <Trophy size={48} className="text-lego-blue" />
                </div>
                
                <h2 className="text-4xl font-black text-slate-900 mb-2">
                  {t.quizFinished}
                </h2>
                <p className="text-slate-500 mb-8">{t.masterDesc}</p>
                
                <div className="flex justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-black text-lego-blue">{score}</div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t.correctLabel}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-black text-slate-200">/</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-black text-slate-400">{quizData.length}</div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t.totalLabel}</div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl mb-8">
                  <p className="text-slate-700 font-medium italic">
                    {score === quizData.length ? t.results.perfect :
                     score > quizData.length / 2 ? t.results.good :
                     t.results.start}
                  </p>
                </div>

                <button
                  onClick={handleStart}
                  className="bg-lego-blue hover:bg-blue-700 text-white font-black py-4 px-12 rounded-2xl text-xl shadow-brick transition-all active:translate-y-1 active:shadow-none uppercase tracking-widest flex items-center gap-3 mx-auto"
                >
                  <RotateCcw size={24} />
                  {t.retryBtn}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cheat Sheet - Visible on all pages */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl mt-8"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="text-lego-yellow" /> {t.cheatSheet}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="pb-2">{t.fraction}</th>
                  <th className="pb-2">{t.decimal}</th>
                  <th className="pb-2">{t.percent}</th>
                  <th className="pb-2">{t.meaning}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr><td className="py-2">1/10</td><td>0.1</td><td>10%</td><td>{t.meanings.oneTenth}</td></tr>
                <tr><td className="py-2">1/4</td><td>0.25</td><td>25%</td><td>{t.meanings.quarter}</td></tr>
                <tr><td className="py-2">1/2</td><td>0.5</td><td>50%</td><td>{t.meanings.half}</td></tr>
                <tr><td className="py-2">3/4</td><td>0.75</td><td>75%</td><td>{t.meanings.threeQuarters}</td></tr>
                <tr><td className="py-2">4/5</td><td>0.8</td><td>80%</td><td>{t.meanings.fourFifths}</td></tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      <footer className="max-w-4xl mx-auto p-8 text-center text-slate-400 text-sm">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}
