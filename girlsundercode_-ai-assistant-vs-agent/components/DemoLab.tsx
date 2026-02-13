
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface DemoLabProps {
    initialMode?: 'assistant' | 'agent';
}

const DemoLab: React.FC<DemoLabProps> = ({ initialMode = 'assistant' }) => {
  const [mode, setMode] = useState<'assistant' | 'agent'>(initialMode);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<{ id: string, type: 'step' | 'result' | 'user', text: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const runSimulation = async () => {
    if (!prompt.trim()) return;

    setIsProcessing(true);
    const userMsg = { id: Date.now().toString(), type: 'user' as const, text: prompt };
    setLogs(prev => [...prev, userMsg]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = mode === 'assistant' 
        ? "Ты - AI Ассистент. Твоя задача - дать краткий черновик или идею по запросу пользователя. Не планируй действия, просто дай ответ."
        : "Ты - AI Агент. Твоя задача - разбить цель пользователя на конкретные автономные шаги (планирование, выполнение, проверка). Описывай процесс так, будто ты уже это делаешь в разных системах.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction }
      });

      const resultText = response.text || "Ошибка генерации";
      
      if (mode === 'agent') {
        const steps = [
            "Анализирую входящий запрос...",
            "Проверяю доступные инструменты в CRM и Telegram...",
            "Создаю цепочку действий для достижения цели...",
            "Инициирую выполнение..."
        ];

        for (const step of steps) {
            await new Promise(r => setTimeout(r, 1000));
            setLogs(prev => [...prev, { id: Math.random().toString(), type: 'step', text: step }]);
        }
      }

      setLogs(prev => [...prev, { id: 'res-' + Date.now(), type: 'result', text: resultText }]);
    } catch (err) {
      setLogs(prev => [...prev, { id: 'err', type: 'result', text: "Произошла ошибка связи с нейросетью. Проверьте соединение." }]);
    } finally {
      setIsProcessing(false);
      setPrompt('');
    }
  };

  return (
    <section className="py-12 px-6 max-w-5xl mx-auto w-full font-baloo">
      <div className="flex justify-center mb-10 bg-white/[0.02] backdrop-blur-3xl p-2 rounded-full w-fit mx-auto border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => setMode('assistant')}
          className={`px-9 py-3 rounded-full font-orbitron text-[10px] tracking-widest leading-none transition-all ${mode === 'assistant' ? 'bg-yellow-500 text-white shadow-[0_0_20px_#eab308]' : 'text-gray-500 hover:text-white'}`}
        >
          РЕЖИМ АССИСТЕНТА
        </button>
        <button 
          onClick={() => setMode('agent')}
          className={`px-9 py-3 rounded-full font-orbitron text-[10px] tracking-widest leading-none transition-all ${mode === 'agent' ? 'bg-cyan-600 text-white shadow-[0_0_20px_#22d3ee]' : 'text-gray-500 hover:text-white'}`}
        >
          РЕЖИМ АГЕНТА
        </button>
      </div>

      <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(217,70,239,0.05)] flex flex-col h-[650px]">
        {/* Terminal Header */}
        <div className="bg-white/[0.05] px-6 py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-md">
          <div className="flex gap-2.5">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_#eab308]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
          </div>
          <span className="text-[10px] font-orbitron text-gray-500 uppercase tracking-[0.2em]">
            System status: <span className="text-green-500 animate-pulse">Node_Active_v1.0</span>
          </span>
        </div>

        {/* Console Logs */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 font-mono text-sm custom-scrollbar">
          {logs.length === 0 && (
            <div className="text-gray-600 italic space-y-2 opacity-60">
              <p>&gt; Ожидание пользовательского ввода...</p>
              <p className="text-xs">&gt; Пример: "Организуй рассылку предложений клиентам из CRM"</p>
            </div>
          )}
          {logs.map(log => (
            <div key={log.id} className={`flex ${log.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-[1.5rem] p-6 shadow-2xl backdrop-blur-3xl border ${
                log.type === 'user' ? 'bg-white/10 text-gray-100 border-white/20' :
                log.type === 'step' ? 'bg-cyan-950/40 text-cyan-200 border-cyan-500/30' :
                'bg-pink-950/40 text-gray-200 border-pink-500/30'
              }`}>
                {log.type === 'step' && <span className="mr-3 animate-pulse text-cyan-400 font-bold">⚡</span>}
                <span className="leading-relaxed font-baloo">{log.text}</span>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex items-center gap-4 text-cyan-400 animate-pulse font-orbitron text-[10px] tracking-widest pl-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping shadow-[0_0_10px_#22d3ee]"></span>
              <span>SYNCHRONIZING WITH NEURAL_MESH...</span>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-6 bg-white/[0.02] border-t border-white/10 backdrop-blur-3xl">
          <form 
            onSubmit={(e) => { e.preventDefault(); runSimulation(); }}
            className="flex gap-4"
          >
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={mode === 'assistant' ? "Задай вопрос ассистенту..." : "Поставь цель агенту..."}
              className="flex-1 bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all focus:bg-black/80 placeholder:text-gray-600 text-lg font-baloo"
            />
            <button 
              type="submit"
              disabled={isProcessing}
              className="px-10 rounded-2xl font-orbitron font-black text-xs tracking-widest transition-all bg-pink-600 hover:bg-pink-500 shadow-[0_0_20px_rgba(217,70,239,0.3)] disabled:opacity-50 text-white active:scale-95 uppercase"
            >
              RUN
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-2xl hover:border-pink-500/30 transition-colors side-glow-hover cursor-default">
          <h4 className="font-orbitron text-[10px] text-pink-400 mb-4 uppercase tracking-[0.6em] font-bold">ОЖИДАЕМЫЙ ROI</h4>
          <p className="text-gray-400 text-lg leading-relaxed font-light italic">Снижение операционных расходов на 30-40% за счет исключения ручных сверок.</p>
        </div>
        <div className="p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-2xl hover:border-cyan-500/30 transition-colors side-glow-hover cursor-default">
          <h4 className="font-orbitron text-[10px] text-cyan-400 mb-4 uppercase tracking-[0.6em] font-bold">МАСШТАБИРОВАНИЕ</h4>
          <p className="text-gray-400 text-lg leading-relaxed font-light italic">Один агент заменяет команду из 5 человек на этапе обработки первичных лидов.</p>
        </div>
      </div>
    </section>
  );
};

export default DemoLab;
