
import { GoogleGenAI, Type } from "@google/genai";
import { QuizData } from "../types";

export async function generateRecommendation(data: QuizData): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Как эксперт по ИИ-решениям и чат-ботам, проанализируй ответы клиента на опрос и составь краткую рекомендацию (до 300 символов) о том, какая архитектура бота ему лучше всего подойдет.
    
    Ответы:
    - Деятельность: ${data.occupation}
    - Языки: ${data.languages.join(', ')} ${data.languagesOther ? `(и: ${data.languagesOther})` : ''}
    - Основная задача: ${data.primaryNeed}
    - Платформы: ${data.platforms.join(', ')} ${data.platformsOther ? `(и: ${data.platformsOther})` : ''}
    - Функции: ${data.functions.join(', ')}
    - Интеграции: ${data.integrations.join(', ')}
    - База клиентов: ${data.customerBase}
    - Объем: ${data.volume}
    - Нужен ИИ: ${data.aiConsultant}
    - Сроки: ${data.timing}
    
    Ответь на русском языке. Текст должен быть вдохновляющим и профессиональным.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Ваш запрос принят! Мы скоро свяжемся с вами для детального обсуждения.";
  } catch (error) {
    console.error("Error generating recommendation:", error);
    return "Отличный выбор! Ваша конфигурация выглядит многообещающе.";
  }
}
