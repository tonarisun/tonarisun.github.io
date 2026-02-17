
import React, { useState, useMemo, useEffect } from 'react';
import StarBackground from './components/StarBackground';
import { QuizData } from './types';
import { QUIZ_QUESTIONS } from './constants';
import { generateRecommendation } from './services/geminiService';
import { initTelegramUtils, sendSignalToAdmin } from '../utils/telegramUtils';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Telegram utilities globally
    initTelegramUtils();
  }, []);

  const [formData, setFormData] = useState<QuizData>({
    occupation: '',
    languages: [],
    languagesOther: '',
    primaryNeed: '',
    primaryNeedOther: '',
    platforms: [],
    platformsOther: '',
    functions: [],
    functionsOther: '',
    integrations: [],
    customerBase: '',
    volume: '',
    aiConsultant: '',
    timing: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (key: keyof QuizData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleOption = (key: keyof QuizData, option: string) => {
    setFormData((prev) => {
      const current = prev[key] as string[];
      if (current.includes(option)) {
        return { ...prev, [key]: current.filter((item) => item !== option) };
      } else {
        return { ...prev, [key]: [...current, option] };
      }
    });
  };

  // Validation Logic
  const isFormValid = useMemo(() => {
    return QUIZ_QUESTIONS.every((q) => {
      const value = formData[q.id];
      const otherValue = q.hasOther ? (formData as any)[`${q.id}Other`] : '';

      if (q.type === 'text') {
        return (value as string).trim().length > 0;
      }

      if (q.type === 'select') {
        // Valid if an option is selected OR (hasOther is true AND other field is filled)
        return (value as string).length > 0 || (q.hasOther && otherValue && otherValue.trim().length > 0);
      }

      if (q.type === 'multi') {
        // Valid if at least one option selected OR (hasOther is true AND other field is filled)
        return (value as string[]).length > 0 || (q.hasOther && otherValue && otherValue.trim().length > 0);
      }

      return false;
    });
  }, [formData]);

  const handleSubmit = async () => {
    if (!isFormValid) return;

    // Collect result as "Question - Answer" text
    const formattedResult = QUIZ_QUESTIONS.map((q) => {
      let answer = '';
      const val = formData[q.id];
      
      if (Array.isArray(val)) {
        answer = val.join(', ');
      } else {
        answer = val as string;
      }

      if (q.hasOther) {
        const otherVal = (formData as any)[`${q.id}Other`];
        if (otherVal && otherVal.trim().length > 0) {
          answer = answer ? `${answer}, ${otherVal}` : otherVal;
        }
      }
      
      return `${q.title} - ${answer || 'Нет ответа'}`;
    }).join('\n');

    console.log("=== DATA FOR HANDLER ===");
    console.log(formattedResult);
    // Here you would pass 'formattedResult' to your specific handler if needed.
    
    setIsSubmitting(true);
    try {
      const rec = await generateRecommendation(formData);
      setRecommendation(rec);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendToTelegram = async () => {
    await sendSignalToAdmin({
      service_type: "quiz_result",
      action: "send_quiz_result",
      quiz_data: {
        occupation: formData.occupation,
        languages: formData.languages,
        languages_other: formData.languagesOther,
        primary_need: formData.primaryNeed,
        primary_need_other: formData.primaryNeedOther,
        platforms: formData.platforms,
        platforms_other: formData.platformsOther,
        functions: formData.functions,
        functions_other: formData.functionsOther,
        integrations: formData.integrations,
        customer_base: formData.customerBase,
        volume: formData.volume,
        ai_consultant: formData.aiConsultant,
        timing: formData.timing,
        recommendation: recommendation
      }
    });
  };

  return (
    <div className="relative w-full min-h-screen sm:min-h-[850px] flex items-center justify-center p-4 sm:p-6 md:p-10 z-[10] font-sans">
      <StarBackground />
      
      {/* Glass Tablet Frame */}
      <div className="relative w-full max-w-5xl h-[85vh] sm:h-[800px] glass-panel rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden flex flex-col border border-white/10 shadow-2xl z-20">
        
        {/* Glow Effects (Decorative) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 blur-[100px] pointer-events-none z-0" />

        {/* Header */}
        <div className="relative p-5 sm:p-6 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-md z-30">
          <div className="flex items-center gap-3 sm:gap-4">
             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-pink-500 p-[1px]">
                <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center">
                   <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                </div>
             </div>
             <div>
                <h1 className="text-sm sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 tracking-wider uppercase leading-tight">
                  Bot Design Lab
                </h1>
                <p className="text-[8px] sm:text-[10px] text-slate-500 font-mono">CONNECTION: SECURE // LINK: @codev04ki_bot</p>
             </div>
          </div>
          <div className="hidden sm:flex gap-3">
             <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded text-[10px] font-mono tracking-tighter">QUIZ</span>
             <span className="px-2 py-1 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded text-[10px] font-mono tracking-tighter">КВИЗ</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative flex-1 overflow-y-auto p-5 sm:p-8 md:p-10 space-y-10 sm:space-y-12 z-30">
          {!submitted ? (
            <>
              {QUIZ_QUESTIONS.map((q) => (
                <div key={q.id} className="group space-y-4 sm:space-y-5 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[8px] sm:text-[10px] font-mono text-cyan-400 group-hover:border-cyan-400/50 transition-colors flex-shrink-0">
                      {q.id.toUpperCase().slice(0, 3)}
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-medium text-slate-100 group-hover:text-white transition-colors">
                        {q.title}
                      </h2>
                      {q.subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-1 font-light leading-snug">{q.subtitle}</p>}
                    </div>
                  </div>

                  <div className="pl-10 sm:pl-12">
                    {q.type === 'text' && (
                      <input
                        type="text"
                        value={formData[q.id] as string}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        placeholder="Напишите здесь..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 sm:p-4 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                      />
                    )}

                    {(q.type === 'select' || q.type === 'multi') && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {q.options?.map((opt) => {
                          const isSelected = q.type === 'select' 
                            ? formData[q.id] === opt 
                            : (formData[q.id] as string[]).includes(opt);
                          
                          return (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                                isSelected
                                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-100 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                                  : 'bg-black/20 border-white/5 text-slate-400 hover:bg-white/5 hover:border-white/10'
                              }`}
                            >
                              <input
                                type={q.type === 'select' ? 'radio' : 'checkbox'}
                                className="hidden"
                                checked={isSelected}
                                onChange={() => {
                                  if (q.type === 'select') {
                                    handleInputChange(q.id, opt);
                                  } else {
                                    handleToggleOption(q.id, opt);
                                  }
                                }}
                              />
                              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
                                isSelected ? 'bg-cyan-500 border-cyan-400' : 'bg-transparent border-slate-700'
                              }`}>
                                {isSelected && (
                                  <svg className="w-3 h-3 text-slate-900" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-xs sm:text-sm font-light leading-snug">{opt}</span>
                            </label>
                          );
                        })}
                        {q.hasOther && (
                          <div className="col-span-full">
                             <input
                              type="text"
                              placeholder="Свой вариант..."
                              value={(formData as any)[`${q.id}Other`] || ''}
                              onChange={(e) => handleInputChange(`${q.id}Other` as keyof QuizData, e.target.value)}
                              className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none focus:border-pink-500/40 transition-all"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="pt-8 sm:pt-10 flex flex-col items-center gap-4 pb-16 sm:pb-20">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full sm:w-auto px-10 sm:px-16 py-4 sm:py-5 font-bold rounded-xl sm:rounded-2xl text-base sm:text-lg transition-all transform uppercase tracking-widest shadow-xl
                    ${isFormValid && !isSubmitting 
                      ? 'animated-neon-button bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-slate-950 hover:scale-105 cursor-pointer' 
                      : 'bg-white/10 text-slate-500 cursor-not-allowed border border-white/5'
                    }`}
                >
                  {isSubmitting ? 'Выполняется расчет...' : 'Узнать результат'}
                </button>
                <p className="text-[8px] sm:text-[10px] text-slate-600 font-mono tracking-widest animate-pulse italic text-center">
                  {!isFormValid ? '* ЗАПОЛНИТЕ ВСЕ ПОЛЯ *' : '*SYSTEM READY FOR TRANSMISSION*'}
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8 sm:space-y-10 animate-in zoom-in duration-700">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-pink-500/50 flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="max-w-2xl space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight uppercase">Анализ завершен</h2>
                <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl backdrop-blur-xl relative overflow-hidden group">
                   <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-pink-500"></div>
                   <p className="text-base sm:text-xl text-slate-200 italic font-light leading-relaxed">
                     {recommendation}
                   </p>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm">Все параметры готовы к отправке. Наш специалист свяжется с вами через Telegram-бота.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full justify-center">
                <button
                  onClick={sendToTelegram}
                  className="px-8 sm:px-12 py-4 sm:py-5 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(0,136,204,0.3)]"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0C5.324 0 0 5.324 0 11.944c0 6.62 5.324 11.944 11.944 11.944 6.621 0 11.944-5.324 11.944-11.944C23.888 5.324 18.565 0 11.944 0zm5.492 8.216l-1.902 8.963c-.143.645-.525.804-1.066.498l-2.896-2.135-1.398 1.344c-.154.154-.284.284-.582.284l.208-2.95 5.369-4.848c.234-.209-.052-.325-.363-.118l-6.634 4.177-2.859-.894c-.622-.194-.634-.622.13-.918l11.173-4.305c.517-.194.97.114.82.902z" />
                  </svg>
                  ОТПРАВИТЬ АДМИНУ
                </button>
                
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 sm:px-12 py-4 sm:py-5 bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10 font-medium rounded-xl sm:rounded-2xl transition-all"
                >
                  ИЗМЕНИТЬ ДАННЫЕ
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative p-3 sm:p-4 border-t border-white/5 bg-black/40 flex justify-between items-center text-[8px] sm:text-[10px] text-slate-600 font-mono z-30">
          <div className="flex gap-3 sm:gap-4">
             <span className="flex items-center gap-1 sm:gap-2"><span className="w-1 h-1 rounded-full bg-cyan-400"></span> CPU: 12%</span>
             <span className="flex items-center gap-1 sm:gap-2"><span className="w-1 h-1 rounded-full bg-pink-400"></span> LATENCY: 24ms</span>
          </div>
          <span className="uppercase tracking-widest opacity-50 hidden xs:block">Secure AI v.2.5</span>
        </div>
      </div>
    </div>
  );
};

export default App;
