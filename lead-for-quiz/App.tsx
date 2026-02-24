
import React, { useState, useEffect } from 'react';
import {
  Zap,
  Target,
  TrendingUp,
  BrainCircuit,
  Layers,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  PieChart,
  MousePointer2,
  Sparkles,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import { QuizType, TabType } from './types';
import { initTelegramUtils, sendSignalToAdmin } from '../utils/telegramUtils';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('poster');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram?.WebApp) {
      console.log('🚀 Initializing Telegram WebApp...');
      window.Telegram.WebApp.ready();
      console.log('✅ Telegram WebApp initialized');
    } else {
      console.log('⚠️ Telegram WebApp not available');
    }

    // Initialize Telegram utilities globally
    initTelegramUtils();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateViewport = (event?: MediaQueryListEvent) => {
      setIsMobile(event ? event.matches : mediaQuery.matches);
    };

    updateViewport();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateViewport);
      return () => mediaQuery.removeEventListener('change', updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

  const neonText = "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 font-bold";
  const glassCard = "backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500";

  const handleOrderClick = async () => {
    await sendSignalToAdmin({
      service_type: "quiz",
      action: "order_quiz"
    });
  };

  const quizTypes: QuizType[] = [
    {
      title: "РАСЧЕТНЫЙ (Калькулятор)",
      desc: "Помогает клиенту узнать цену без звонка менеджера.\nИдеально для услуг с переменной стоимостью.",
      benefit: "Убирает страх 'слишком дорого'.\nДает конкретику.",
      example: "«Рассчитайте стоимость ремонта вашей квартиры за 30 секунд»",
      icon: <PieChart className="text-pink-500" size={32} />,
      stats: "Конверсия: 12-18%",
      hoverShadow: "group-hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]",
      hoverBorder: "group-hover:border-pink-500/50"
    },
    {
      title: "ПОДБОРЩИК (Гайд-квиз)",
      desc: "Сужает выбор из сотен товаров до 2-3 идеальных вариантов.\nОснован на личных предпочтениях пользователя.",
      benefit: "Решает проблему 'мук выбора' у клиента.",
      example: "«Какой набор косметики подходит вашему типу кожи?»",
      icon: <Layers className="text-cyan-400" size={32} />,
      stats: "Лояльность: +45%",
      hoverShadow: "group-hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]",
      hoverBorder: "group-hover:border-cyan-400/50"
    },
    {
      title: "ЭКСПЕРТНЫЙ (Аудит)",
      desc: "Проверяет знания или текущее состояние дел клиента.\nПоказывает вашу глубокую экспертность.",
      benefit: "Клиент понимает свои ошибки.\nОн хочет исправить их именно у вас.",
      example: "«На сколько ваша CRM настроена эффективно? Проверьте по 10 пунктам»",
      icon: <CheckCircle2 className="text-purple-400" size={32} />,
      stats: "Качество лида: Высокое",
      hoverShadow: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]",
      hoverBorder: "group-hover:border-purple-500/50"
    },
    {
      title: "ДИАГНОСТИЧЕСКИЙ",
      desc: "Выявляет скрытую проблему клиента.\nПредлагает решение в виде вашего продукта.",
      benefit: "Мягкая продажа через пользу.",
      example: "«Почему ваш рекламный бюджет сливается? Узнайте причину»",
      icon: <BrainCircuit className="text-yellow-400" size={32} />,
      stats: "Прогрев: 9/10",
      hoverShadow: "group-hover:shadow-[0_0_40px_rgba(234,179,8,0.2)]",
      hoverBorder: "group-hover:border-yellow-500/50"
    },
    {
      title: "РАЗВЛЕКАТЕЛЬНЫЙ",
      desc: "Использует юмор и любопытство.\nЛегко становится виральным в соцсетях.",
      benefit: "Огромный охват.\nДешевые подписчики в базу.",
      example: "«Кто вы из мира 'Звездных Войн' в отделе маркетинга?»",
      icon: <Sparkles className="text-green-400" size={32} />,
      stats: "Виральность: x5",
      hoverShadow: "group-hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]",
      hoverBorder: "group-hover:border-green-500/50"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-slate-200 font-sans selection:bg-pink-500/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-pink-900/15 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-900/15 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-slow-pan" />
      </div>

      <div className={`relative z-10 max-w-6xl mx-auto ${isMobile ? 'px-4 py-6' : 'px-6 py-12'}`}>
        {/* Navigation Tabs */}
        <div className={`flex justify-center ${isMobile ? 'mb-10' : 'mb-16'}`}>
          <div className="bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex flex-wrap justify-center gap-1">
            <button 
              onClick={() => setActiveTab('poster')}
              className={`${isMobile ? 'px-4 py-2.5 text-[9px] tracking-[0.12em]' : 'px-6 md:px-8 py-3 text-[10px] tracking-[0.2em]'} rounded-xl font-bold uppercase transition-all duration-300 ${activeTab === 'poster' ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-900/40' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Обучающий Постер
            </button>
            <button 
              onClick={() => setActiveTab('examples')}
              className={`${isMobile ? 'px-4 py-2.5 text-[9px] tracking-[0.12em]' : 'px-6 md:px-8 py-3 text-[10px] tracking-[0.2em]'} rounded-xl font-bold uppercase transition-all duration-300 ${activeTab === 'examples' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/40' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Библиотека Квизов
            </button>
          </div>
        </div>

        {/* Tab 1: Educational Poster */}
        {activeTab === 'poster' && (
          <div className={`${isMobile ? 'space-y-14' : 'space-y-24'} animate-in fade-in slide-in-from-bottom-12 duration-1000`}>
            <header className="text-center relative">
              <div className={`inline-block rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 font-black uppercase animate-bounce ${isMobile ? 'px-4 py-1.5 text-[9px] tracking-[0.22em] mb-6' : 'px-6 py-2 text-[10px] tracking-[0.4em] mb-8'}`}>
              OS AI Lab • Cyber Academy
              </div>
              <h1 className={`${isMobile ? 'text-3xl mb-6' : 'text-4xl sm:text-5xl md:text-8xl mb-8'} font-black tracking-tighter leading-none italic uppercase`}>
                ЛИД ЗА <span className={`${neonText} pr-4`}>КВИЗ</span>
              </h1>
              <div className={`max-w-3xl mx-auto text-slate-400 font-medium leading-relaxed ${isMobile ? 'text-base' : 'text-xl md:text-2xl'}`}>
                Инструмент, который превращает скучные анкеты в <span className="text-white border-b-2 border-pink-500/50">захватывающий диалог</span>.<br />
                Снижает стоимость заявки <span className="text-pink-400 font-bold">в 2-3 раза</span>.
              </div>
            </header>

            <section className="grid md:grid-cols-2 gap-10">
              <div className={`${glassCard} ${isMobile ? 'p-6' : 'p-10'} flex flex-col justify-between group hover:border-pink-500/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] transition-all transform hover:-translate-y-2`}>
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-500/30 transition-all duration-500 ${isMobile ? 'mb-6' : 'mb-8'}`}>
                    <MousePointer2 className="text-pink-400" size={28} />
                  </div>
                  <h3 className={`${isMobile ? 'text-2xl mb-4' : 'text-4xl mb-6'} font-black uppercase tracking-tight italic leading-none text-white`}>Вовлечение через игру</h3>
                  <div className={`text-slate-400 leading-relaxed ${isMobile ? 'text-base' : 'text-lg'}`}>
                    Люди ненавидят анкеты, но обожают тесты. 
                    В квизе человек делает первый клик незаметно для себя. 
                    Азарт «узнать результат» ведет его до самого конца воронки.
                  </div>
                </div>
                <div className={`border-t border-white/10 flex items-center ${isMobile ? 'mt-8 pt-6 gap-4' : 'mt-10 pt-8 gap-6'}`}>
                  <span className={`text-pink-500 font-black drop-shadow-[0_0_12px_rgba(236,72,153,0.8)] ${isMobile ? 'text-3xl' : 'text-4xl'}`}>x3</span>
                  <span className={`uppercase font-bold text-slate-500 text-left ${isMobile ? 'text-[9px] tracking-[0.12em]' : 'text-[10px] tracking-[0.2em]'}`}>выше конверсия<br />в финальную заявку</span>
                </div>
              </div>

              <div className={`${glassCard} ${isMobile ? 'p-6' : 'p-10'} flex flex-col justify-between group hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all transform hover:-translate-y-2`}>
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/30 transition-all duration-500 ${isMobile ? 'mb-6' : 'mb-8'}`}>
                    <Target className="text-cyan-400" size={28} />
                  </div>
                  <h3 className={`${isMobile ? 'text-2xl mb-4' : 'text-4xl mb-6'} font-black uppercase tracking-tight italic leading-none text-white`}>Фильтр клиентов</h3>
                  <div className={`text-slate-400 leading-relaxed ${isMobile ? 'text-base' : 'text-lg'}`}>
                    Пока клиент отвечает на вопросы, бот проводит квалификацию.
                    Он узнает бюджет, сроки и реальные боли.
                    Ваш менеджер получает уже сегментированного, «горячего» клиента.
                  </div>
                </div>
                <div className={`border-t border-white/10 flex items-center ${isMobile ? 'mt-8 pt-6 gap-4' : 'mt-10 pt-8 gap-6'}`}>
                  <span className={`text-cyan-400 font-black drop-shadow-[0_0_12px_rgba(6,182,212,0.8)] ${isMobile ? 'text-3xl' : 'text-4xl'}`}>0%</span>
                  <span className={`uppercase font-bold text-slate-500 text-left ${isMobile ? 'text-[9px] tracking-[0.12em]' : 'text-[10px] tracking-[0.2em]'}`}>лишних звонков<br />по нецелевым лидам</span>
                </div>
              </div>
            </section>

            <section className={`relative overflow-hidden border border-white/5 bg-white/[0.02] ${isMobile ? 'py-12 rounded-[2rem]' : 'py-20 rounded-[3rem]'}`}>
               <div className="absolute inset-0 flex items-center justify-center opacity-30 blur-[120px] pointer-events-none">
                  <div className="w-[500px] h-[500px] bg-purple-600 rounded-full animate-pulse" />
               </div>
               <div className={`relative flex flex-col items-center text-center ${isMobile ? 'px-4' : 'px-6'}`}>
                  <div className={`${isMobile ? 'mb-8 p-4' : 'mb-10 p-6'} rounded-full border border-cyan-500/40 bg-cyan-500/10 animate-pulse`}>
                    <BrainCircuit size={80} className="text-cyan-400" />
                  </div>
                  <h2 className={`${isMobile ? 'text-3xl mb-6' : 'text-4xl md:text-5xl mb-8'} font-black uppercase italic leading-none`}>Архитектура <br/><span className="text-cyan-400 underline decoration-pink-500 underline-offset-8">Квиз-Воронки</span></h2>
                  <div className={`flex flex-wrap justify-center max-w-4xl ${isMobile ? 'gap-3' : 'gap-6'}`}>
                    {["Трафик", "Крючок", "Вопросы", "Захват контакта", "Результат + Бонус"].map((step, idx) => (
                      <div key={idx} className={`flex items-center rounded-2xl bg-black/40 border border-white/10 font-bold uppercase hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all cursor-pointer group/step ${isMobile ? 'gap-2 px-4 py-3 text-[9px] tracking-[0.12em]' : 'gap-4 px-6 py-4 text-[10px] tracking-[0.2em]'}`}>
                        <span className="text-pink-500 text-base">{idx + 1}.</span> {step}
                        {idx < 4 && <ArrowRight size={18} className="text-slate-600 group-hover/step:translate-x-1 transition-transform" />}
                      </div>
                    ))}
                  </div>
               </div>
            </section>

            <div className={`text-center ${isMobile ? 'pb-14' : 'pb-24'}`}>
               <button 
                onClick={() => {
                  setActiveTab('examples');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`group relative bg-white text-black font-black uppercase hover:bg-pink-500 hover:text-white transition-all duration-500 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] transform hover:scale-105 ${isMobile ? 'px-6 py-4 rounded-2xl tracking-[0.16em]' : 'px-16 py-8 rounded-3xl tracking-[0.3em]'}`}
               >
                 <span className={`relative z-10 flex items-center ${isMobile ? 'gap-2 text-xs' : 'gap-4 text-sm'}`}>
                   Библиотека примеров <ArrowRight className="animate-bounce-x" />
                 </span>
                 <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               </button>
            </div>
          </div>
        )}

        {/* Tab 2: Quiz Examples Library */}
        {activeTab === 'examples' && (
          <div className={`animate-in slide-in-from-right-12 duration-1000 ${isMobile ? 'space-y-10 pb-14' : 'space-y-16 pb-24'}`}>
            <header>
              <h2 className={`${isMobile ? 'text-3xl mb-4' : 'text-5xl md:text-7xl mb-6'} font-black uppercase tracking-tighter italic leading-none`}>Арсенал <br /><span className={neonText}>маркетолога</span></h2>
              <div className={`text-slate-400 leading-relaxed max-w-2xl border-l-4 border-cyan-500 ${isMobile ? 'text-base pl-4' : 'text-lg md:text-xl pl-6'}`}>
                Выберите тип квиза под вашу бизнес-задачу.<br />
                Каждый вид решает свою конкретную проблему воронки.
              </div>
            </header>

            <div className="grid gap-8">
              {quizTypes.map((quiz, i) => (
                <div 
                  key={i} 
                  className={`${glassCard} group flex flex-col md:flex-row items-start md:items-center border-l-8 ${quiz.hoverShadow} ${quiz.hoverBorder} ${isMobile ? 'p-6 gap-6' : 'p-10 gap-10'}`}
                  style={{borderLeftColor: 'rgba(236, 72, 153, 0.4)'}}
                >
                  <div className="p-6 rounded-3xl bg-[#0a0a0c] border border-white/10 group-hover:scale-110 transition-all duration-700 group-hover:bg-black group-hover:border-white/20 shadow-xl shadow-black">
                    {quiz.icon}
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-black uppercase italic leading-none tracking-tight text-white`}>{quiz.title}</h3>
                      <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-[9px] font-black text-slate-500 border border-white/10 uppercase group-hover:border-white/40 group-hover:text-white transition-all">{quiz.stats}</span>
                    </div>
                    <div className={`text-slate-300 leading-snug whitespace-pre-line font-medium opacity-80 group-hover:opacity-100 transition-opacity ${isMobile ? 'text-base' : 'text-lg'}`}>
                      {quiz.desc}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-black/40 border border-white/5 group-hover:border-pink-500/30 transition-all duration-500">
                        <p className="text-[10px] uppercase font-black text-pink-500 mb-3 tracking-[0.2em] flex items-center gap-2">
                          <Lightbulb size={16} /> Преимущество
                        </p>
                        <div className="text-sm text-slate-400 italic whitespace-pre-line group-hover:text-slate-200 transition-colors">
                          {quiz.benefit}
                        </div>
                      </div>
                      <div className="p-6 rounded-2xl bg-pink-500/[0.03] border border-pink-500/10 group-hover:bg-pink-500/[0.08] group-hover:border-cyan-400/30 transition-all duration-500">
                        <p className="text-[10px] uppercase font-black text-cyan-400 mb-3 tracking-[0.2em] flex items-center gap-2">
                          <MessageSquare size={16} /> Пример заголовка
                        </p>
                        <p className="text-base text-white font-bold group-hover:scale-[1.02] transition-transform origin-left leading-tight">
                          {quiz.example}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final CTA / Stats */}
            <div className={`bg-gradient-to-br from-pink-600/15 via-transparent to-cyan-600/15 border border-white/10 text-center hover:shadow-[0_0_80px_rgba(236,72,153,0.15)] transition-all group overflow-hidden relative ${isMobile ? 'p-6 rounded-[2rem]' : 'p-16 rounded-[3rem]'}`}>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
               <h3 className={`${isMobile ? 'text-3xl mb-8' : 'text-4xl md:text-5xl mb-10'} font-black uppercase italic leading-none relative z-10`}>Готовы внедрить <br/><span className="text-white">в свой бизнес?</span></h3>
               <div className="flex flex-wrap justify-center gap-8 relative z-10">
                 <div className={`${isMobile ? 'p-6 min-w-[140px]' : 'p-8 min-w-[180px]'} bg-black/60 rounded-[2rem] border border-white/10 flex flex-col items-center group-hover:border-pink-500/50 group-hover:scale-105 transition-all duration-500`}>
                    <BarChart3 className="text-pink-500 mb-4" size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Снижение CPL</span>
                    <span className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-black text-white`}>-40%</span>
                 </div>
                 <div className={`${isMobile ? 'p-6 min-w-[140px]' : 'p-8 min-w-[180px]'} bg-black/60 rounded-[2rem] border border-white/10 flex flex-col items-center group-hover:border-cyan-400/50 group-hover:scale-105 transition-all duration-500`} style={{ transitionDelay: '0.1s' }}>
                    <TrendingUp className="text-cyan-400 mb-4" size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Рост конверсии</span>
                    <span className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-black text-white`}>x2.5</span>
                 </div>
                 <div className={`${isMobile ? 'p-6 min-w-[140px]' : 'p-8 min-w-[180px]'} bg-black/60 rounded-[2rem] border border-white/10 flex flex-col items-center group-hover:border-yellow-400/50 group-hover:scale-105 transition-all duration-500`} style={{ transitionDelay: '0.2s' }}>
                    <Zap className="text-yellow-400 mb-4" size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Запуск</span>
                    <span className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-black text-white`}>1 день</span>
                 </div>
               </div>

               <div className={`${isMobile ? 'mt-10' : 'mt-16'} relative z-10`}>
                 <button 
                  onClick={handleOrderClick}
                  className={`group relative bg-white text-black font-black uppercase hover:bg-pink-500 hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] transform hover:scale-105 active:scale-95 overflow-hidden ${isMobile ? 'px-6 py-4 tracking-[0.12em] rounded-xl' : 'px-12 py-6 tracking-[0.2em] rounded-2xl'}`}
                 >
                   <span className="relative z-10 flex items-center gap-3">
                     ЗАКАЗАТЬ КВИЗ <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                   </span>
                   <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 </button>
               </div>
            </div>
          </div>
        )}
      </div>

      <footer className={`relative mt-auto border-t border-white/5 text-center text-slate-600 bg-black/20 ${isMobile ? 'py-10' : 'py-16'}`}>
        <div className={`max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 ${isMobile ? 'px-4' : 'px-6'}`}>
          <p className={`text-[10px] font-mono uppercase opacity-50 ${isMobile ? 'tracking-[0.2em]' : 'tracking-[0.5em]'}`}>© 2026 OS AI Lab. Built with AI & Passion.</p>
        </div>
      </footer>

      <style>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
