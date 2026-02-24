import React, { useState } from 'react';
import { 
  MessageSquare, 
  TrendingUp, 
  Zap, 
  Users, 
  Layers, 
  BrainCircuit, 
  Database,
  RefreshCcw,
  CheckCircle2,
  Cpu,
  Clock,
  FileText,
  Target
} from 'lucide-react';
import { BotType, QuizQuestion, BotResult, QuizResult, QuizAnswers, QuizSelectedAnswers } from '../types';

interface QuizProps {
  onComplete: (result: QuizResult) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<BotType, number>>>({
    [BotType.LINEAR]: 0,
    [BotType.AI_ASSISTANT]: 0,
    [BotType.INTEGRATOR]: 0
  });
  const [selectedAnswers, setSelectedAnswers] = useState<QuizSelectedAnswers>({});
  const [isSelecting, setIsSelecting] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Какая задача отнимает у тебя больше всего времени?",
      options: [
        { 
          label: "Ответы на одни и те же вопросы клиентов", 
          icon: <MessageSquare />, 
          value: "faq",
          points: { [BotType.LINEAR]: 5, [BotType.AI_ASSISTANT]: 1 }
        },
        { 
          label: "Сбор заявок и квалификация клиентов", 
          icon: <Target />, 
          value: "leads",
          points: { [BotType.AI_ASSISTANT]: 5, [BotType.LINEAR]: 1 }
        },
        { 
          label: "Передача данных и отчёты внутри команды", 
          icon: <FileText />, 
          value: "internal",
          points: { [BotType.INTEGRATOR]: 5, [BotType.AI_ASSISTANT]: 1 }
        }
      ]
    },
    {
      id: 2,
      question: "Где ты теряешь клиентов или деньги прямо сейчас?",
      options: [
        { 
          label: "Клиенты пишут ночью — и уходят без ответа", 
          icon: <Clock />, 
          value: "offline",
          points: { [BotType.LINEAR]: 5, [BotType.AI_ASSISTANT]: 2 }
        },
        { 
          label: "Менеджеры тратят время на нецелевых клиентов", 
          icon: <Users />, 
          value: "unqualified",
          points: { [BotType.AI_ASSISTANT]: 5, [BotType.LINEAR]: 1 }
        },
        { 
          label: "Данные теряются при передаче между отделами", 
          icon: <Database />, 
          value: "data_loss",
          points: { [BotType.INTEGRATOR]: 5, [BotType.AI_ASSISTANT]: 1 }
        }
      ]
    },
    {
      id: 3,
      question: "Что для тебя приоритет на ближайшие 3–6 месяцев?",
      options: [
        { 
          label: "Быстрое и качественное обслуживание 24/7", 
          icon: <Zap />, 
          value: "support",
          points: { [BotType.LINEAR]: 5, [BotType.AI_ASSISTANT]: 1 }
        },
        { 
          label: "Больше заявок и рост конверсии в продажу", 
          icon: <TrendingUp />, 
          value: "conversion",
          points: { [BotType.AI_ASSISTANT]: 5, [BotType.LINEAR]: 1 }
        },
        { 
          label: "Порядок внутри команды и снижение расходов", 
          icon: <Layers />, 
          value: "efficiency",
          points: { [BotType.INTEGRATOR]: 5, [BotType.AI_ASSISTANT]: 1 }
        }
      ]
    }
  ];

  const handleSelect = (points: Partial<Record<BotType, number>>, selectedLabel: string) => {
    if (isSelecting) {
      return;
    }

    setIsSelecting(true);

    const newAnswers = { ...answers };
    Object.keys(points).forEach((key) => {
      const type = key as BotType;
      newAnswers[type] = (newAnswers[type] || 0) + (points[type] || 0);
    });
    setAnswers(newAnswers);

    // Сохраняем выбранный ответ
    const newSelectedAnswers = { ...selectedAnswers };
    newSelectedAnswers[questions[step].id] = selectedLabel;
    setSelectedAnswers(newSelectedAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
      setTimeout(() => setIsSelecting(false), 250);
    } else {
      const winner = Object.entries(newAnswers).reduce((a, b) => (a[1] > b[1] ? a : b))[0] as BotType;
      const result: QuizResult = {
        botType: winner,
        answers: newAnswers as QuizAnswers,
        questions: questions,
        selectedAnswers: newSelectedAnswers
      };
      onComplete(result);
      setIsSelecting(false);
    }
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 md:mb-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-pink-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">Question {step + 1}/{questions.length}</span>
          <span className="text-gray-500 text-[10px] md:text-xs">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_0_10px_rgba(236,72,153,0.5)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <h3 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-8 leading-tight">
          {questions[step].question}
        </h3>

        <div key={questions[step].id} className="grid gap-3 md:gap-4">
          {questions[step].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option.points, option.label)}
              disabled={isSelecting}
              className="group flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-pink-500/10 hover:border-pink-500/50 transition-all text-left relative overflow-hidden disabled:opacity-80 disabled:pointer-events-none"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-pink-400 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all shrink-0">
                <div className="scale-75 md:scale-100 flex items-center justify-center">
                  {option.icon}
                </div>
              </div>
              <span className="text-base md:text-lg font-medium text-gray-200 group-hover:text-white pr-6">{option.label}</span>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 className="text-pink-500 w-5 h-5 md:w-6 md:h-6" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;