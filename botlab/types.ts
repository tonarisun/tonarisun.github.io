
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
