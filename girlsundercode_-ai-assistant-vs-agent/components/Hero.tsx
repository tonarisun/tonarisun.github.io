
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden font-baloo">
      {/* Side Neon Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-12 h-48 border border-pink-500/30 bg-pink-500/5 backdrop-blur-md hidden xl:flex items-center justify-center -rotate-3 shadow-[0_0_20px_rgba(217,70,239,0.1)]">
        <span className="font-orbitron text-[9px] text-pink-500 vertical-text tracking-[0.8em] uppercase opacity-70">LIQUID CAPITAL</span>
      </div>
      <div className="absolute top-1/3 right-10 w-10 h-64 border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md hidden xl:flex items-center justify-center rotate-6 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
        <span className="font-orbitron text-[9px] text-cyan-500 vertical-text tracking-[0.8em] uppercase opacity-70">NEURAL ARCH</span>
      </div>

      <div className="max-w-6xl w-full relative z-10 pt-20">
        <div className="text-center space-y-4 mb-20">
          <h1 className="font-orbitron text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] italic uppercase side-glow-hover cursor-default inline-block">
            ТЕХНОЛОГИИ&nbsp;— ЭТО
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-white to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(217,70,239,0.9)]">
              НОВЫЙ КАПИТАЛ
            </span>
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
                <div className="p-10 bg-white/[0.03] border-l-[6px] border-pink-500 backdrop-blur-3xl rounded-r-3xl shadow-2xl">
                  <p className="text-2xl text-white font-black leading-tight mb-6 uppercase italic tracking-tight side-glow-hover cursor-default">
                      AI-Ассистент или AI-Агент: <br/>
                      <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">Что нужно вашему бизнесу?</span>
                  </p>
                  <p className="text-gray-400 text-lg leading-relaxed font-light max-w-xl side-glow-hover cursor-default">
                      Многие путают эти понятия, но разница между ними — как между навигатором в машине и автопилотом Теслы.<br />
                      Пора разобраться, кто действительно принесет вам деньги в новой экономике.
                  </p>
                </div>
            </div>
            
            <div className="lg:col-span-5 relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-3xl blur-2xl group-hover:opacity-100 transition-opacity opacity-40"></div>
                <div className="relative p-12 border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <svg className="w-16 h-16 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M12 2L1 12l11 10 11-10L12 2zm0 18.2L3.8 12 12 5.8l8.2 6.2-8.2 6.2z"/>
                        </svg>
                    </div>
                    <blockquote className="text-lg text-white italic font-light leading-relaxed mb-8 relative z-10 side-glow-hover cursor-default">
                        Технологии — это не просто инструменты.<br />
                        Это актив, который работает 24/7, обеспечивая ваше преимущество.
                    </blockquote>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-[1px] bg-cyan-400"></div>
                        <span className="font-orbitron text-[10px] text-cyan-400 uppercase tracking-[0.4em] font-bold">OS AI PHILOSOPHY</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
         <span className="font-orbitron text-[10px] text-gray-600 uppercase tracking-[0.4em] animate-pulse">SCROLL TO ANALYZE</span>
         <div className="w-[1px] h-16 bg-gradient-to-b from-pink-500 via-cyan-400 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
