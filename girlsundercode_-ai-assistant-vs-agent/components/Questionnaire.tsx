
import React, { useState } from 'react';

interface QuestionnaireProps {
  onClose: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60">
      <div className="max-w-lg w-full bg-gray-900 border border-purple-500/30 rounded-2xl shadow-[0_0_50px_rgba(147,51,234,0.2)] p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
        
        {step === 1 ? (
          <div className="space-y-6">
            <h3 className="font-orbitron text-2xl text-white">Добро пожаловать в будущее</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Для наилучшего результата позвольте задать вам пару вопросов. В какой индустрии вы работаете?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['E-commerce', 'IT & Software', 'Real Estate', 'Education', 'Marketing', 'FinTech'].map(ind => (
                <button 
                  key={ind}
                  onClick={() => setStep(2)}
                  className="p-3 text-xs font-orbitron border border-gray-800 rounded-lg hover:border-purple-500 hover:bg-purple-500/10 text-gray-400 hover:text-white transition-all"
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="font-orbitron text-2xl text-white">Почти готово</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Что для вас сейчас важнее: <span className="text-purple-400">ускорить текущую работу</span> или <span className="text-cyan-400">полностью делегировать процессы</span>?
            </p>
            <div className="space-y-3">
              <button 
                onClick={onClose}
                className="w-full p-4 text-left border border-gray-800 rounded-lg hover:border-purple-500 hover:bg-purple-500/10 group transition-all"
              >
                <div className="font-orbitron text-xs text-purple-400 mb-1">ВАРИАНТ А</div>
                <div className="text-white text-sm">Ускорить работу (Нужен AI-Ассистент)</div>
              </button>
              <button 
                onClick={onClose}
                className="w-full p-4 text-left border border-gray-800 rounded-lg hover:border-cyan-500 hover:bg-cyan-500/10 group transition-all"
              >
                <div className="font-orbitron text-xs text-cyan-400 mb-1">ВАРИАНТ Б</div>
                <div className="text-white text-sm">Делегировать всё (Нужен AI-Агент)</div>
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={onClose}
          className="mt-8 text-[10px] text-gray-600 uppercase tracking-widest font-orbitron hover:text-gray-400 w-full text-center"
        >
          Пропустить
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
