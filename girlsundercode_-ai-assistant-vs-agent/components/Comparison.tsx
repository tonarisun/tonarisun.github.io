
import React from 'react';

const Comparison: React.FC = () => {
  return (
    <section className="py-40 px-6 relative overflow-hidden font-baloo">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
            <div className="space-y-4">
                <div className="text-pink-500 font-orbitron text-xs tracking-[0.6em] uppercase mb-2">Architectural Logic</div>
                <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase leading-none italic side-glow-hover cursor-default inline-block">
                    БИТВА <br/> <span className="text-transparent outline-text drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">ВОЗМОЖНОСТЕЙ</span>
                </h2>
            </div>
            <div className="max-w-md bg-white/[0.02] p-8 border-l-[3px] border-cyan-500 backdrop-blur-3xl rounded-r-2xl shadow-2xl">
                <p className="text-gray-400 text-lg font-light leading-relaxed italic side-glow-hover cursor-default">
                    Выбор архитектуры определяет скорость масштабирования вашего капитала.<br />
                    Ассистент ускоряет вас, агент — вашу систему.
                </p>
            </div>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-[2rem] bg-black/50 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-10 px-10 font-orbitron text-[10px] text-gray-600 uppercase tracking-[0.5em] w-1/4">Capability Matrix</th>
                <th className="py-10 px-12 font-orbitron text-2xl text-pink-500 bg-pink-500/5 drop-shadow-[0_0_15px_#d946ef]">Ассистент <span className="text-[10px] text-pink-400/40 block font-light tracking-[0.4em] uppercase mt-1">(Co-pilot)</span></th>
                <th className="py-10 px-12 font-orbitron text-2xl text-cyan-400 bg-cyan-500/5 drop-shadow-[0_0_15px_#22d3ee]">Агент <span className="text-[10px] text-cyan-400/40 block font-light tracking-[0.4em] uppercase mt-1">(Autopilot)</span></th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <Row label="Главная роль" v1="Умный помощник «на подхвате»" v2="Автономный цифровой сотрудник" />
              <Row label="Принцип работы" v1="Предлагает решение по задаче" v2="Сам планирует шаги до цели" />
              <Row label="Инициатива" v1="Реактивен: ждет команды" v2="Проактивен: следит за триггерами" />
              <Row label="Доступ к системам" v1="В рамках чата / одного окна" v2="CRM, банк, сайт, мессенджеры" />
              <Row label="Результат" v1="Черновик, выжимка, идея" v2="Закрытая сделка, оплаченный счет" />
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .outline-text {
            -webkit-text-stroke: 1.5px #22d3ee;
            color: transparent;
        }
      `}</style>
    </section>
  );
};

const Row: React.FC<{ label: string; v1: string; v2: string }> = ({ label, v1, v2 }) => (
  <tr className="border-b border-white/5 group transition-all duration-500">
    <td className="py-12 px-10 font-mono text-[10px] text-gray-600 uppercase tracking-[0.3em] group-hover:text-pink-500 transition-colors">{label}</td>
    <td className="py-12 px-12 group-hover:bg-pink-500/[0.02] text-gray-400 transition-all duration-500 group-hover:text-white text-lg font-baloo">{v1}</td>
    <td className="py-12 px-12 group-hover:bg-cyan-500/[0.02] font-semibold text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] text-lg font-baloo">{v2}</td>
  </tr>
);

export default Comparison;
