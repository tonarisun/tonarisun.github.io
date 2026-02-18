import React, { useState, useEffect } from 'react';
import {
  Bot,
  Cpu,
  Zap,
  Clock,
  Users,
  TrendingUp,
  MessageSquare,
  Layers,
  ShieldCheck,
  ChevronRight,
  BrainCircuit,
  Terminal,
  Code2,
  Rocket,
  RefreshCcw,
  Sparkles
} from 'lucide-react';
import Quiz from './components/Quiz';
import { BotType, BotResult, QuizResult, QuizSelectedAnswers } from './types';
import { initTelegramUtils, sendSignalToAdmin } from '../utils/telegramUtils';


const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    setIsLoaded(true);

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

  const botResults: Record<BotType, BotResult> = {
    [BotType.LINEAR]: {
      type: BotType.LINEAR,
      title: "Кнопочный Бот-Администратор",
      description: "Ваш идеальный выбор — структурированный бот с четким меню. Он отлично справится с записью клиентов, ответами на FAQ и первичной квалификацией лидов.",
      icon: <Layers size={48} />,
      colorClass: "from-pink-500 to-rose-600"
    },
    [BotType.AI_ASSISTANT]: {
      type: BotType.AI_ASSISTANT,
      title: "ИИ-Ассистент (Нейро-сотрудник)",
      description: "Вам нужен интеллектуальный помощник на базе LLM. Он понимает живую речь, умеет работать с возражениями и продавать ваш продукт так же круто, как топовый менеджер.",
      icon: <BrainCircuit size={48} />,
      colorClass: "from-purple-500 to-indigo-600"
    },
    [BotType.INTEGRATOR]: {
      type: BotType.INTEGRATOR,
      title: "Бот-Интегратор (Системный мозг)",
      description: "Ваша задача — автоматизация. Этот бот свяжет Telegram с вашей CRM, 1С, Google Таблицами и платежными шлюзами, исключив ошибки человеческого фактора.",
      icon: <Zap size={48} />,
      colorClass: "from-cyan-500 to-blue-600"
    }
  };

  const sections = {
    home: { title: "Главная" },
    whatIsBot: { title: "Что такое бот?" },
    workflow: { title: "Как мы работаем" },
    types: { title: "Виды ботов" },
    benefits: { title: "Выгоды" }
  };

  const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`bg-black bg-opacity-40 backdrop-blur-xl border border-white border-opacity-10 rounded-2xl p-5 md:p-6 ${className}`}>
      {children}
    </div>
  );

  const QuizButton = ({ className = "", size = "normal" }: { className?: string, size?: "normal" | "large" }) => (
    <button 
      onClick={() => setActiveSection('quiz')}
      className={`bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 rounded-full font-bold shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 text-white ${
        size === "large" 
        ? "px-8 py-4 md:px-12 md:py-6 text-base md:text-xl font-black uppercase tracking-widest" 
        : "px-8 py-4 text-lg"
      } ${className}`}
    >
      Подобрать бота <Sparkles size={size === "large" ? 24 : 20}/>
    </button>
  );

  const renderHome = () => (
    <div className={`flex flex-col items-center justify-center h-full min-h-[60vh] transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

      {/* Centered Text Content */}
      <div className="w-full max-w-5xl flex flex-col items-center text-center space-y-10 py-8 lg:py-0">
         <div className="inline-block relative group">
            <div className="absolute -inset-1 bg-pink-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative border border-pink-500 px-8 py-3 rounded-xl bg-[#0a0514] shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 transform -skew-x-6">
                  БОТЛАБ
                </h1>
            </div>
         </div>

         <p className="text-gray-300 text-lg md:text-2xl leading-relaxed font-light max-w-3xl mx-auto">
           Добро пожаловать в будущее автоматизации. Мы создаем 'мозг' вашего бизнеса в цифровой среде под брендом GirlsUnderCode. Мы не просто пишем код — мы проектируем интеллектуальные системы, которые разгружают ваш бизнес.
         </p>

         <div className="pt-8">
           <button 
             onClick={() => setActiveSection('quiz')}
             className="px-10 py-5 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 rounded-full font-bold shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95 text-white text-xl group"
           >
             Подобрать бота <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform"/>
           </button>
         </div>
      </div>

    </div>
  );

  const renderQuiz = () => {
    if (quizResult) {
      const result = botResults[quizResult.botType];
      
      const handleOrder = async () => {
        console.log('🎯 Starting order process for:', result.title);
        console.log('📊 Quiz result data:', {
          type: result.type,
          title: result.title,
          description: result.description
        });

        try {
          console.log('📤 Calling sendSignalToAdmin...');
          await sendSignalToAdmin({
            service_type: "bot_development_order",
            action: "order_bot_development",
            quiz_result: {
              bot_type: result.type,
              title: result.title,
              description: result.description
            },
            quiz_data: quizResult.questions.map(question => ({
              question: question.question,
              answer: quizResult.selectedAnswers[question.id] || 'Не выбран'
            })),
            result_text: `Результат опроса: ${result.title} - ${result.description}`
          });
          console.log('✅ Order process completed successfully');
        } catch (error) {
          console.error('❌ Error in handleOrder:', error);
          // Show user-friendly error message
          alert('Произошла ошибка при отправке заказа. Попробуйте еще раз.');
        }
      };

      return (
        <div className="animate-fadeIn space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold italic uppercase tracking-tighter">Ваш результат готов!</h2>
            <p className="text-gray-400 text-sm md:text-base">На основе ваших ответов, мы подобрали идеальное решение:</p>
          </div>
          
          <GlassCard className="relative p-6 md:p-12 border-pink-500/50 overflow-hidden">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${result.colorClass} opacity-10 blur-3xl -mr-20 -mt-20 pointer-events-none`}></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
              <div className={`p-6 rounded-3xl bg-gradient-to-br ${result.colorClass} shadow-xl shadow-pink-500/20 shrink-0`}>
                {result.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight leading-tight">{result.title}</h3>
                <p className="text-sm md:text-lg text-gray-300 leading-relaxed">
                  {result.description}
                </p>
                <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button 
                    onClick={handleOrder}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm md:text-base"
                  >
                    Заказать разработку
                  </button>
                  <button 
                    onClick={() => { setQuizResult(null); }}
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full font-bold flex items-center justify-center gap-2 transition-all text-sm md:text-base"
                  >
                    Пройти заново <RefreshCcw size={18}/>
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      );
    }

    return (
      <div className="animate-fadeIn space-y-8 md:space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter border-b-4 border-pink-500 inline-block pb-2">Умный Подбор</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">Ответьте на 3 вопроса, чтобы узнать, какой бот принесет вашему бизнесу максимум пользы прямо сейчас.</p>
        </div>
        <Quiz onComplete={(type) => setQuizResult(type)} />
      </div>
    );
  };

  const renderTypes = () => (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-6">
       <h2 className="text-3xl md:text-4xl font-bold border-l-4 border-purple-500 pl-4 uppercase italic tracking-tighter">Виды ботов</h2>
       <div className="flex flex-col gap-6">
          {[
            {
              id: 1,
              title: "Кнопочные",
              icon: <Layers className="w-8 h-8 text-pink-500" />,
              desc: "Принцип: меню — кнопка — результат. Идеально для FAQ и записи на услуги.",
              plus: "Простота и предсказуемость."
            },
            {
              id: 2,
              title: "ИИ-ассистенты",
              icon: <BrainCircuit className="w-8 h-8 text-purple-500" />,
              desc: "Используют нейросети. Понимают живую речь и снимают возражения клиентов.",
              plus: "Общаются как человек."
            },
            {
              id: 3,
              title: "Интеграторы",
              icon: <Zap className="w-8 h-8 text-cyan-500" />,
              desc: "Связывают мессенджеры с CRM, оплатами и внутренними системами учета.",
              plus: "Исключают человеческий фактор."
            }
          ].map(item => (
            <GlassCard key={item.id} className="group hover:border-pink-500 transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="p-4 bg-black/40 rounded-2xl group-hover:scale-110 transition-transform shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 w-full">
                  <h3 className="text-xl md:text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.desc}</p>
                  <div className="pt-4 border-t border-white/10 w-full">
                     <span className="text-[10px] uppercase text-gray-500 block mb-1">Главный плюс:</span>
                     <p className="text-pink-400 font-medium text-sm">{item.plus}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
       </div>
       <div className="flex justify-center mt-12">
          <QuizButton />
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0514] text-white font-sans overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* Background Decor */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900 rounded-full blur-[120px] opacity-20 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900 rounded-full blur-[120px] opacity-20 animate-pulse pointer-events-none"></div>
      <div className="fixed top-[20%] right-[10%] w-[20%] h-[20%] bg-cyan-900 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-2 md:py-0 md:h-20 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
          <div className="w-full md:w-auto flex items-center justify-between">
            <button onClick={() => setActiveSection('home')} className="flex items-center space-x-3 group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.4)] group-hover:scale-110 transition-transform">
                <Cpu size={20} className="text-white md:w-6 md:h-6" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">БОТЛАБ</span>
            </button>
          </div>

          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <div className="flex space-x-4 md:space-x-6 px-1">
              {Object.entries(sections).map(([key, sec]) => (
                <button 
                  key={key} 
                  onClick={() => setActiveSection(key)}
                  className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all relative py-2 whitespace-nowrap ${activeSection === key ? 'text-pink-500' : 'text-gray-400 hover:text-white'}`}
                >
                  {sec.title}
                  {activeSection === key && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button 
             onClick={() => setActiveSection('quiz')}
             className="hidden lg:block px-6 py-2 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-pink-500 hover:text-white transition-all shadow-lg"
          >
            Начать квиз
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-28 md:pt-32 pb-16 md:pb-24 px-4 md:px-6 max-w-6xl mx-auto relative z-10">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'quiz' && renderQuiz()}
        {activeSection === 'types' && renderTypes()}
        {activeSection === 'whatIsBot' && (
          <div className="space-y-8 md:space-y-12 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold border-l-4 border-pink-500 pl-4 uppercase italic tracking-tighter">Что такое бот?</h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light italic">
                  Это ваш цифровой сотрудник, который работает 24/7 без больничных, перекуров и плохого настроения.
                </p>
                <div className="grid gap-4">
                  {[
                    { t: "Никогда не спит", d: "Обработка лидов даже в 3 часа ночи — это реальность." },
                    { t: "Мгновенный ответ", d: "Ни один клиент не ждет дольше пары секунд." },
                    { t: "RAG Технологии", d: "Бот обучается на ваших документах, прайсах и базе знаний." }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 md:p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-pink-400 uppercase text-sm tracking-wide">{item.t}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center relative py-8 md:py-0">
                 <div className="absolute inset-0 bg-cyan-500 blur-[120px] opacity-10 animate-pulse"></div>
                 <Bot size={200} className="text-cyan-400 opacity-80 animate-bounce transition-all duration-[3000ms] md:w-[280px] md:h-[280px]" />
              </div>
            </div>
            <div className="flex justify-center mt-12">
                <QuizButton />
            </div>
          </div>
        )}
        {activeSection === 'workflow' && (
          <div className="space-y-8 md:space-y-12 animate-fadeIn text-center">
             <h2 className="text-3xl md:text-4xl font-bold border-b-4 border-cyan-500 inline-block pb-2 uppercase italic tracking-tighter">Процесс создания</h2>
             <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-left">
                {[
                  { title: "Анализ", desc: "Изучаем ваши бизнес-процессы и находим 'узкие места', которые съедают время команды.", icon: <Terminal /> },
                  { title: "Сборка", desc: "Проектируем логику, обучаем нейросеть и настраиваем все интеграции.", icon: <Code2 /> },
                  { title: "Запуск", desc: "Интегрируем бота в ваши каналы связи и обучаем команду работе с ИИ.", icon: <Rocket /> }
                ].map((step, idx) => (
                   <GlassCard key={idx} className="group hover:border-cyan-500/50 transition-all relative">
                      <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500 flex items-center justify-center font-black text-black z-20 text-sm md:text-base">
                        {idx + 1}
                      </div>
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 md:mb-6 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                         {step.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                   </GlassCard>
                ))}
             </div>
             <div className="flex justify-center mt-12">
                <QuizButton />
            </div>
          </div>
        )}
        {activeSection === 'benefits' && (
          <div className="space-y-8 md:space-y-12 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold border-l-4 border-cyan-500 pl-4 uppercase italic tracking-tighter">Преимущества</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Экономия времени", desc: "Минус 4 часа рутины в день для владельца.", icon: <Clock /> },
                { label: "Скорость реакции", desc: "Ответ за несколько секунд — клиент не уйдет к конкуренту.", icon: <Zap /> },
                { label: "Снижение ФОТ", desc: "Заменяет до 2-х администраторов поддержки.", icon: <Users /> },
                { label: "Продажи 24/7", desc: "Принимает оплату и выставляет счета даже в 2 часа ночи.", icon: <TrendingUp /> }
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.07] transition-all group">
                   <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                      <div className="scale-75 md:scale-100 flex items-center justify-center">
                        {benefit.icon}
                      </div>
                   </div>
                   <div className="flex-1">
                      <h4 className="text-base md:text-lg font-bold text-white uppercase tracking-tight">{benefit.label}</h4>
                      <p className="text-gray-400 text-xs md:text-sm">{benefit.desc}</p>
                   </div>
                </div>
              ))}
            </div>
            <div className="mt-12 md:mt-16 text-center p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-b from-purple-900/30 to-black border border-purple-500/20 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-pink-500/5 mix-blend-overlay"></div>
               <h3 className="text-2xl md:text-5xl font-black mb-6 md:mb-8 italic tracking-tighter relative z-10 leading-tight">Готовы запустить свой бот?</h3>
               <QuizButton className="relative z-10 w-full sm:w-auto mx-auto" size="large" />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 py-8 md:py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="flex items-center space-x-3 opacity-50">
            <Cpu size={20} />
            <span className="text-lg font-bold uppercase italic tracking-tighter">БОТЛАБ</span>
          </div>
          <div className="text-gray-500 text-xs md:text-sm font-mono uppercase tracking-widest text-center md:text-right">
            © 2026 GirlsUnderCode. Built with AI & Passion.
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-bounce {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        ::selection {
          background-color: #ec4899;
          color: white;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default App;