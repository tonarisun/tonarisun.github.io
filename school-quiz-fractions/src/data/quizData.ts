export interface LocalizedString {
  ru: string;
  en: string;
}

export interface LocalizedOptions {
  ru: string[];
  en: string[];
}

export interface Question {
  id: number;
  type: 'visual' | 'conversion' | 'mistake';
  question: LocalizedString;
  legoCount?: number;
  options: LocalizedOptions;
  correctAnswerIndex: number; // Use index for language independence
  explanation: LocalizedString;
}

export const quizData: Question[] = [
  // --- VISUAL SECTION (7 Questions) ---
  {
    id: 1,
    type: 'visual',
    question: {
      ru: "На пластине 100 точек. Мы поставили 25 красных кирпичиков. Какая это часть в процентах?",
      en: "There are 100 studs on the plate. We placed 25 red bricks. What percentage is this?"
    },
    legoCount: 25,
    options: {
      ru: ["25%", "5%", "50%", "1/4%"],
      en: ["25%", "5%", "50%", "1/4%"]
    },
    correctAnswerIndex: 0,
    explanation: {
      ru: "25 точек из 100 — это ровно 25%!",
      en: "25 studs out of 100 is exactly 25%!"
    }
  },
  {
    id: 2,
    type: 'visual',
    question: {
      ru: "Половина пластины (50 точек) синяя. Как это записать десятичным числом?",
      en: "Half of the plate (50 studs) is blue. How do you write this as a decimal?"
    },
    legoCount: 50,
    options: {
      ru: ["0.05", "0.5", "5.0", "0.50%"],
      en: ["0.05", "0.5", "5.0", "0.50%"]
    },
    correctAnswerIndex: 1,
    explanation: {
      ru: "Половина — это 0.5 или 50/100.",
      en: "Half is 0.5 or 50/100."
    }
  },
  {
    id: 3,
    type: 'visual',
    question: {
      ru: "Мы заняли 10 точек из 100. Какая это дробь?",
      en: "We occupied 10 studs out of 100. What fraction is this?"
    },
    legoCount: 10,
    options: {
      ru: ["1/2", "1/10", "1/100", "10/10"],
      en: ["1/2", "1/10", "1/100", "10/10"]
    },
    correctAnswerIndex: 1,
    explanation: {
      ru: "10 из 100 — это 1/10 часть пластины.",
      en: "10 out of 100 is 1/10 of the plate."
    }
  },
  {
    id: 4,
    type: 'visual',
    question: {
      ru: "Три четверти пластины (75 точек) покрыты деталями. Сколько это в процентах?",
      en: "Three-quarters of the plate (75 studs) are covered. How much is that in percent?"
    },
    legoCount: 75,
    options: {
      ru: ["34%", "7.5%", "75%", "0.75%"],
      en: ["34%", "7.5%", "75%", "0.75%"]
    },
    correctAnswerIndex: 2,
    explanation: {
      ru: "3/4 — это всегда 75%.",
      en: "3/4 is always 75%."
    }
  },
  {
    id: 5,
    type: 'visual',
    question: {
      ru: "Всего 5 точек из 100 заняты. Как это записать десятичным числом?",
      en: "Only 5 studs out of 100 are occupied. How do you write this as a decimal?"
    },
    legoCount: 5,
    options: {
      ru: ["0.5", "0.05", "5.0", "0.005"],
      en: ["0.5", "0.05", "5.0", "0.005"]
    },
    correctAnswerIndex: 1,
    explanation: {
      ru: "5 сотых записывается как 0.05. Не путай с 0.5 (это 50)!",
      en: "5 hundredths is written as 0.05. Don't confuse it with 0.5 (which is 50)!"
    }
  },
  {
    id: 6,
    type: 'visual',
    question: {
      ru: "80 точек из 100 — это сколько в виде десятичного числа?",
      en: "80 studs out of 100 — how much is that as a decimal?"
    },
    legoCount: 80,
    options: {
      ru: ["0.08", "8.0", "0.8", "0.88"],
      en: ["0.08", "8.0", "0.8", "0.88"]
    },
    correctAnswerIndex: 2,
    explanation: {
      ru: "80/100 = 8/10 = 0.8.",
      en: "80/100 = 8/10 = 0.8."
    }
  },
  {
    id: 7,
    type: 'visual',
    question: {
      ru: "Вся пластина (100 точек) заполнена. Сколько это процентов?",
      en: "The whole plate (100 studs) is filled. How many percent is that?"
    },
    legoCount: 100,
    options: {
      ru: ["10%", "100%", "1%", "0.1%"],
      en: ["10%", "100%", "1%", "0.1%"]
    },
    correctAnswerIndex: 1,
    explanation: {
      ru: "Целая пластина — это всегда 100%!",
      en: "A whole plate is always 100%!"
    }
  },

  // --- CONVERSION SECTION (7 Questions) ---
  {
    id: 8,
    type: 'conversion',
    question: {
      ru: "Переведи дробь 1/4 в проценты.",
      en: "Convert the fraction 1/4 to percent."
    },
    options: {
      ru: ["25%", "40%", "14%", "4%"],
      en: ["25%", "40%", "14%", "4%"]
    },
    correctAnswerIndex: 0,
    explanation: {
      ru: "1/4 * 100 = 25%.",
      en: "1/4 * 100 = 25%."
    }
  },
  {
    id: 9,
    type: 'conversion',
    question: {
      ru: "Как записать 65% в виде десятичного числа?",
      en: "How to write 65% as a decimal?"
    },
    options: {
      ru: ["6.5", "0.065", "0.65", "65.0"],
      en: ["6.5", "0.065", "0.65", "65.0"]
    },
    correctAnswerIndex: 2,
    explanation: {
      ru: "Делим на 100: переносим запятую на 2 знака влево.",
      en: "Divide by 100: move the decimal point 2 places to the left."
    }
  },
  {
    id: 10,
    type: 'conversion',
    question: {
      ru: "Дробь 4/5 — это сколько процентов?",
      en: "What percentage is the fraction 4/5?"
    },
    options: {
      ru: ["45%", "80%", "40%", "20%"],
      en: ["45%", "80%", "40%", "20%"]
    },
    correctAnswerIndex: 1,
    explanation: {
      ru: "4/5 = 8/10 = 80/100 = 80%.",
      en: "4/5 = 8/10 = 80/100 = 80%."
    }
  },
  {
    id: 11,
    type: 'conversion',
    question: {
      ru: "Переведи 6% в десятичное число.",
      en: "Convert 6% to a decimal number."
    },
    options: {
      ru: ["0.6", "0.06", "6.0", "0.006"],
      en: ["0.6", "0.06", "6.0", "0.006"]
    },
    correctAnswerIndex: 1,
    explanation: {
      ru: "6% / 100 = 0.06. Нужен ноль-хранитель!",
      en: "6% / 100 = 0.06. You need a placeholder zero!"
    }
  },
  {
    id: 12,
    type: 'conversion',
    question: {
      ru: "Дробь 3/5 — это сколько процентов?",
      en: "What percentage is the fraction 3/5?"
    },
    options: {
      ru: ["35%", "60%", "30%", "53%"],
      en: ["35%", "60%", "30%", "53%"]
    },
    correctAnswerIndex: 1,
    explanation: {
      ru: "3/5 = 6/10 = 60%.",
      en: "3/5 = 6/10 = 60%."
    }
  },
  {
    id: 13,
    type: 'conversion',
    question: {
      ru: "Десятичное число 0.7 — это сколько процентов?",
      en: "The decimal number 0.7 is how many percent?"
    },
    options: {
      ru: ["7%", "70%", "0.7%", "77%"],
      en: ["7%", "70%", "0.7%", "77%"]
    },
    correctAnswerIndex: 1,
    explanation: {
      ru: "0.7 = 0.70 = 70%.",
      en: "0.7 = 0.70 = 70%."
    }
  },
  {
    id: 14,
    type: 'conversion',
    question: {
      ru: "Как записать 1/10 в процентах?",
      en: "How to write 1/10 as a percentage?"
    },
    options: {
      ru: ["1%", "10%", "0.1%", "100%"],
      en: ["1%", "10%", "0.1%", "100%"]
    },
    correctAnswerIndex: 1,
    explanation: {
      ru: "1/10 часть от 100 — это 10.",
      en: "1/10 of 100 is 10."
    }
  },

  // --- MISTAKE SPOTTER SECTION (7 Questions) ---
  {
    id: 15,
    type: 'mistake',
    question: {
      ru: "Тео думает, что 0.6 = 6%. Он прав?",
      en: "Theo thinks that 0.6 = 6%. Is he right?"
    },
    options: {
      ru: ["Да, всё верно", "Нет, 0.6 = 60%", "Нет, 0.6 = 0.6%", "Нет, 0.6 = 66%"],
      en: ["Yes, that's correct", "No, 0.6 = 60%", "No, 0.6 = 0.6%", "No, 0.6 = 66%"]
    },
    correctAnswerIndex: 1,
    explanation: {
      ru: "0.6 — это 60 кирпичиков из 100, а 6% — это всего 6 кирпичиков!",
      en: "0.6 is 60 bricks out of 100, and 6% is only 6 bricks!"
    }
  },
  {
    id: 16,
    type: 'mistake',
    question: {
      ru: "Матвей записал: 1/2 = 10%. В чем его ошибка?",
      en: "Matvey wrote: 1/2 = 10%. What is his mistake?"
    },
    options: {
      ru: ["1/2 — это 50%", "1/2 — это 20%", "1/2 — это 5%", "Ошибки нет"],
      en: ["1/2 is 50%", "1/2 is 20%", "1/2 is 5%", "No mistake"]
    },
    correctAnswerIndex: 0,
    explanation: {
      ru: "Половина (1/2) — это всегда 50%.",
      en: "Half (1/2) is always 50%."
    }
  },
  {
    id: 17,
    type: 'mistake',
    question: {
      ru: "Кто-то сказал: '0.07 — это 70%'. Это правда?",
      en: "Someone said: '0.07 is 70%'. Is it true?"
    },
    options: {
      ru: ["Да", "Нет, это 7%", "Нет, это 0.7%", "Нет, это 77%"],
      en: ["Yes", "No, it's 7%", "No, it's 0.7%", "No, it's 77%"]
    },
    correctAnswerIndex: 1,
    explanation: {
      ru: "0.07 — это 7 сотых, то есть 7%.",
      en: "0.07 is 7 hundredths, which means 7%."
    }
  },
  {
    id: 18,
    type: 'mistake',
    question: {
      ru: "Матвей думает, что 4/5 = 40%. Как правильно?",
      en: "Matvey thinks that 4/5 = 40%. What is correct?"
    },
    options: {
      ru: ["4/5 = 80%", "4/5 = 45%", "4/5 = 20%", "4/5 = 4%"],
      en: ["4/5 = 80%", "4/5 = 45%", "4/5 = 20%", "4/5 = 4%"]
    },
    correctAnswerIndex: 0,
    explanation: {
      ru: "4/5 — это 80 из 100.",
      en: "4/5 is 80 out of 100."
    }
  },
  {
    id: 19,
    type: 'mistake',
    question: {
      ru: "Верно ли утверждение: 0.25 и 1/4 — это одно и то же?",
      en: "Is the statement true: 0.25 and 1/4 are the same thing?"
    },
    options: {
      ru: ["Да, это четверть", "Нет, это разные числа", "Только если это пицца", "Только в Лего"],
      en: ["Yes, it's a quarter", "No, they are different numbers", "Only if it's pizza", "Only in Lego"]
    },
    correctAnswerIndex: 0,
    explanation: {
      ru: "Это два способа назвать четверть пластины.",
      en: "These are two ways to name a quarter of the plate."
    }
  },
  {
    id: 20,
    type: 'mistake',
    question: {
      ru: "Если мы уберем знак % у 5%, получится 0.5?",
      en: "If we remove the % sign from 5%, will it be 0.5?"
    },
    options: {
      ru: ["Да", "Нет, получится 0.05", "Нет, получится 5.0", "Нет, получится 0.005"],
      en: ["Yes", "No, it will be 0.05", "No, it will be 5.0", "No, it will be 0.005"]
    },
    correctAnswerIndex: 1,
    explanation: {
      ru: "При переводе из % в десятичное число мы делим на 100.",
      en: "When converting from % to a decimal, we divide by 100."
    }
  },
  {
    id: 21,
    type: 'mistake',
    question: {
      ru: "Что больше: 0.8 или 8%?",
      en: "Which is greater: 0.8 or 8%?"
    },
    options: {
      ru: ["0.8 больше", "8% больше", "Они равны", "Нельзя сравнить"],
      en: ["0.8 is greater", "8% is greater", "They are equal", "Cannot compare"]
    },
    correctAnswerIndex: 0,
    explanation: {
      ru: "0.8 = 80%, а 8% = 0.08. 80% намного больше 8%!",
      en: "0.8 = 80%, and 8% = 0.08. 80% is much larger than 8%!"
    }
  }
];
