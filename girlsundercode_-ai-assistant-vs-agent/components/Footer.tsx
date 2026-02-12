
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-gray-900 bg-black/80 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400"></div>
            <span className="font-orbitron text-lg font-bold tracking-tighter text-white">TECH<span className="text-cyan-400">CAPITAL</span></span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs">
            Будущее принадлежит тем, кто автоматизирует рутину сегодня. Пора передать задачи тем, кто не ошибается.
          </p>
        </div>
        
        <div className="flex gap-12 text-sm text-gray-400">
          <div className="flex flex-col gap-2">
            <span className="text-white font-orbitron text-xs mb-2">Платформа</span>
            <a href="#" className="hover:text-purple-400 transition-colors">Агенты</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Ассистенты</a>
            <a href="#" className="hover:text-purple-400 transition-colors">API</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white font-orbitron text-xs mb-2">Компания</span>
            <a href="#" className="hover:text-cyan-400 transition-colors">О нас</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Кейсы</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Контакты</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-900 text-center text-[10px] text-gray-600 uppercase tracking-widest font-orbitron">
        © 2024 TechCapital Systems. Все права защищены. Интеллект как новый капитал.
      </div>
    </footer>
  );
};

export default Footer;
