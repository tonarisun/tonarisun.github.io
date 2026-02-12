
import React from 'react';

const EducationSection: React.FC = () => {
  return (
    <section className="py-48 px-6 relative font-baloo">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Choice: Assistant */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-[3rem] opacity-20 group-hover:opacity-100 blur-2xl transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-14 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="flex justify-between items-start mb-12">
                    <h3 className="text-3xl font-orbitron font-black text-white italic uppercase tracking-tighter side-glow-hover cursor-default">Ассистент</h3>
                    <span className="font-orbitron text-8xl text-pink-500/10 select-none">01</span>
                </div>
                
                <p className="text-xl text-pink-400 font-light italic mb-12 leading-snug side-glow-hover cursor-default">Если ваша цель — работать быстрее и качественнее.</p>
                
                <ul className="space-y-10 mb-14">
                  <EducationLink text="Писать много контента, писем или кода." color="pink" />
                  <EducationLink text="Анализировать длинные отчеты за секунды." color="pink" />
                  <EducationLink text="«Брейншторм-партнер» для генерации идей." color="pink" />
                </ul>

                <div className="p-8 bg-pink-500/5 border border-pink-500/20 rounded-[2rem] shadow-inner">
                  <div className="text-[10px] uppercase tracking-[0.5em] text-pink-400/60 mb-3 font-orbitron font-bold">ROI PROJECTION</div>
                  <div className="text-3xl text-white font-orbitron font-black">+ <span className="text-pink-500 drop-shadow-[0_0_15px_#d946ef]">3 ЧАСА</span> <span className="text-[11px] text-gray-500 font-light block tracking-[0.4em] mt-1">ЛИЧНОГО ВРЕМЕНИ В ДЕНЬ</span></div>
                </div>
            </div>
          </div>

          {/* Choice: Agent */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[3rem] opacity-20 group-hover:opacity-100 blur-2xl transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-14 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="flex justify-between items-start mb-12">
                    <h3 className="text-3xl font-orbitron font-black text-white italic uppercase tracking-tighter side-glow-hover cursor-default">Агент</h3>
                    <span className="font-orbitron text-8xl text-cyan-500/10 select-none">02</span>
                </div>
                
                <p className="text-xl text-cyan-400 font-light italic mb-12 leading-snug side-glow-hover cursor-default">Если ваша цель — автоматизировать бизнес-процесс целиком.</p>
                
                <ul className="space-y-10 mb-14">
                  <EducationLink text="Обрабатывать лиды до оплаты автономно." color="cyan" />
                  <EducationLink text="Мониторить цены и менять прайс 24/7." color="cyan" />
                  <EducationLink text="Клиентская поддержка без участия человека." color="cyan" />
                </ul>

                <div className="p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-[2rem] shadow-inner">
                  <div className="text-[10px] uppercase tracking-[0.5em] text-cyan-400/60 mb-3 font-orbitron font-bold">SYSTEM SCALING</div>
                  <div className="text-3xl text-white font-orbitron font-black">24 / 7 <span className="text-cyan-400 drop-shadow-[0_0_15px_#22d3ee]">АВТОНОМИЯ</span> <span className="text-[11px] text-gray-500 font-light block tracking-[0.4em] mt-1">МАСШТАБИРОВАНИЕ БЕЗ ШТАТА</span></div>
                </div>
            </div>
          </div>

        </div>

        <div className="mt-40 p-20 bg-gradient-to-br from-white/5 to-white/[0.01] backdrop-blur-3xl rounded-[4rem] border border-white/10 flex flex-col md:flex-row items-center gap-20 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <div className="flex-1 space-y-8 relative z-10">
                <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-cyan-400 mb-8"></div>
                <h4 className="font-orbitron text-3xl text-white font-black italic uppercase tracking-tight side-glow-hover cursor-default">СИНЕРГИЯ <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">СИСТЕМ</span></h4>
                <p className="text-xl text-gray-400 leading-relaxed font-light side-glow-hover cursor-default">
                    В идеальном мире они работают в связке: ассистент помогает принимать стратегические решения, а агенты их исполняют.<br />
                    Ассистент делает эффективным лидера, агент — всю систему.
                </p>
            </div>
            <div className="relative">
                <div className="w-80 h-80 bg-pink-500/[0.03] backdrop-blur-3xl border border-pink-500/20 rounded-full flex items-center justify-center relative shadow-[0_0_100px_rgba(217,70,239,0.1)]">
                    <div className="absolute inset-0 border-[3px] border-dashed border-pink-500/20 rounded-full animate-[spin_40s_linear_infinite]"></div>
                    <div className="absolute inset-10 border border-cyan-500/30 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                    <div className="text-center z-10">
                        <div className="font-orbitron text-2xl font-black text-white tracking-[0.3em]">CAPITAL</div>
                        <div className="text-[10px] text-pink-400 font-mono uppercase tracking-[0.6em] mt-2 font-bold">Optimization</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const EducationLink: React.FC<{ text: string, color: 'pink' | 'cyan' }> = ({ text, color }) => (
  <li className="flex items-center gap-6 group/item">
    <div className={`w-3 h-3 ${color === 'pink' ? 'bg-pink-500 shadow-[0_0_15px_#d946ef]' : 'bg-cyan-500 shadow-[0_0_15px_#22d3ee]'} transition-all duration-300 group-hover/item:scale-150`}></div>
    <span className="text-gray-300 text-xl font-light leading-snug group-hover/item:text-white transition-colors side-glow-hover cursor-default">{text}</span>
  </li>
);

export default EducationSection;
