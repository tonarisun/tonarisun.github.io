
export interface QuizData {
  occupation: string;
  languages: string[];
  languagesOther: string;
  primaryNeed: string;
  primaryNeedOther: string;
  platforms: string[];
  platformsOther: string;
  functions: string[];
  functionsOther: string;
  integrations: string[];
  customerBase: string;
  volume: string;
  aiConsultant: string;
  timing: string;
}

export interface Question {
  id: keyof QuizData;
  title: string;
  subtitle?: string;
  type: 'text' | 'select' | 'multi';
  options?: string[];
  hasOther?: boolean;
}
