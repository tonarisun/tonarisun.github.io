
import { Question } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 'occupation',
    title: 'Чем ты занимаешься?',
    subtitle: '(Коротко: тренер / коуч / дизайнер / салон / магазин / другое)',
    type: 'text'
  },
  {
    id: 'languages',
    title: 'На каком языке должен общаться бот?',
    type: 'multi',
    options: ['Русский', 'Английский', 'Тайский'],
    hasOther: true
  },
  {
    id: 'primaryNeed',
    title: 'Что тебе нужно в первую очередь?',
    type: 'select',
    options: ['Бот для продаж', 'Бот для поддержки', 'ИИ-ассистент для работы', 'Цифровая команда'],
    hasOther: true
  },
  {
    id: 'platforms',
    title: 'Где должен работать бот/ассистент?',
    type: 'multi',
    options: ['Telegram', 'WhatsApp', 'Instagram', 'Сайт'],
    hasOther: true
  },
  {
    id: 'functions',
    title: 'Что бот должен делать?',
    type: 'multi',
    options: ['Отвечать клиентам', 'Принимать заявки', 'Принимать оплату', 'Записывать на услуги', 'Консультировать с помощью ИИ'],
    hasOther: true
  },
  {
    id: 'integrations',
    title: 'Нужны ли интеграции?',
    type: 'multi',
    options: ['CRM', 'Платежи', 'Таблицы / базы данных', 'Пока не знаю']
  },
  {
    id: 'customerBase',
    title: 'У тебя уже есть база клиентов или всё с нуля?',
    type: 'select',
    options: ['Уже есть клиенты', 'Запускаемся с нуля']
  },
  {
    id: 'volume',
    title: 'Какой объём обращений ожидаешь?',
    type: 'select',
    options: ['До 20 в день', '20–100', '100+']
  },
  {
    id: 'aiConsultant',
    title: 'Нужен ли ИИ-консультант?',
    subtitle: '(умные ответы, продажи, помощь сотрудникам)',
    type: 'select',
    options: ['Да', 'Нет', 'Не знаю']
  },
  {
    id: 'timing',
    title: 'Когда планируешь запуск?',
    type: 'select',
    options: ['Срочно (до 2 недель)', 'В течение месяца', 'Позже']
  }
];
