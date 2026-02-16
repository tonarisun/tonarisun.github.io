
import { ReactNode } from 'react';

export interface QuizType {
  title: string;
  desc: string;
  benefit: string;
  example: string;
  icon: ReactNode;
  stats: string;
  hoverShadow: string;
  hoverBorder: string;
}

export type TabType = 'poster' | 'examples';
