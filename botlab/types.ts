
import { ReactNode } from 'react';

export enum BotType {
  LINEAR = 'LINEAR',
  AI_ASSISTANT = 'AI_ASSISTANT',
  INTEGRATOR = 'INTEGRATOR'
}

export interface QuizOption {
  label: string;
  icon: ReactNode;
  value: string;
  points: Partial<Record<BotType, number>>;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface BotResult {
  type: BotType;
  title: string;
  description: string;
  icon: ReactNode;
  colorClass: string;
}

export interface QuizAnswers {
  [BotType.LINEAR]: number;
  [BotType.AI_ASSISTANT]: number;
  [BotType.INTEGRATOR]: number;
}

export interface QuizSelectedAnswers {
  [questionId: number]: string; // questionId -> selected option label
}

export interface QuizResult {
  botType: BotType;
  answers: QuizAnswers;
  questions: QuizQuestion[];
  selectedAnswers: QuizSelectedAnswers;
}
