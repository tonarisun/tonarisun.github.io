
import React, { useEffect } from 'react';
import Hero from './components/Hero';
import EducationSection from './components/EducationSection';
import { initTelegramUtils, sendSignalToAdmin } from '../utils/telegramUtils';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Telegram utilities globally
    initTelegramUtils();
  }, []);

  const handleTransformationClick = async () => {
    await sendSignalToAdmin({
      service_type: "ai_transformation",
      action: "start_transformation"
    });
  };

  return (
    <div className="min-h-screen bg-[#020205] relative selection:bg-pink-500/30">
      {/* Immersive Starry Galaxy Background Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.15] mix-blend-screen scale-100"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/60 to-transparent opacity-95"></div>
        
        {/* Animated Neon Fog Blobs */}
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-pink-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-[0.05]"></div>
      
      <header className="fixed top-0 left-0 right-0 z-[60] bg-black/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-2.5 h-2.5 bg-pink-500 rotate-45 animate-pulse shadow-[0_0_10px_#d946ef]"></div>
            <span className="font-orbitron text-lg font-black tracking-[0.15em] text-white">
              GIRLS<span className="text-pink-500 drop-shadow-[0_0_8px_#d946ef]">UNDERCODE</span>
            </span>
          </div>
          <div className="text-[9px] font-orbitron text-gray-500 tracking-[0.3em] hidden sm:block uppercase">
            Neural Interface // <span className="text-cyan-400">Node Active</span> // District 09
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-16">
        <Hero />

        <EducationSection />

        {/* Finale */}
        <section className="py-48 px-6 relative overflow-hidden text-center">
           <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500/20 via-cyan-500/5 to-transparent blur-3xl"></div>
           </div>
           <div className="max-w-4xl mx-auto relative z-10 space-y-12">
              <h2 className="font-orbitron text-3xl md:text-5xl font-black leading-none uppercase italic text-white">
                БУДУЩЕЕ ПРИНАДЛЕЖИТ ТЕМ, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-white to-cyan-400 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">КТО АВТОМАТИЗИРУЕТ</span>
              </h2>
              <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                Пора передать задачи тем, кто не ошибается.<br />
                AI-агент — это высокоскоростной двигатель, который разгоняет продуктивность компании в десятки раз.
              </p>
              <div className="pt-8">
                 <button
                   onClick={handleTransformationClick}
                   className="px-16 py-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-orbitron font-black text-sm tracking-[0.2em] hover:from-pink-500 hover:to-purple-500 transition-all rounded-full shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:scale-105 active:scale-95 uppercase"
                 >
                    НАЧАТЬ ТРАНСФОРМАЦИЮ
                 </button>
              </div>
           </div>
        </section>
      </main>
      
      <style>{`
        .cyber-grid {
            background-image: linear-gradient(rgba(217, 70, 239, 0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px);
            background-size: 60px 60px;
        }
      `}</style>
    </div>
  );
};

export default App;
