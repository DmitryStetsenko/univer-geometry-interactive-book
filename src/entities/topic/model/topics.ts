import type { Topic, Chapter } from './types';

// Resolve SVG URLs using Vite's dynamic asset loading mechanism
const pythagorasStep1Url = new URL('../../../shared/assets/asymptote/pythagoras_step1.svg', import.meta.url).href;
const pythagorasStep2Url = new URL('../../../shared/assets/asymptote/pythagoras_step2.svg', import.meta.url).href;
const pythagorasStep3Url = new URL('../../../shared/assets/asymptote/pythagoras_step3.svg', import.meta.url).href;

// Import Asymptote code snippets directly from source files using Vite raw loaders
import pythagorasStep1Code from '../../../shared/assets/asymptote/pythagoras_step1.asy?raw';
import pythagorasStep2Code from '../../../shared/assets/asymptote/pythagoras_step2.asy?raw';
import pythagorasStep3Code from '../../../shared/assets/asymptote/pythagoras_step3.asy?raw';

/**
 * Global database of topics. 
 * To add a new topic, simply add an entry to this array.
 * The system automatically integrates it into navigation and routing.
 */
export const topics: Topic[] = [
  {
    id: 'pythagorean-theorem',
    title: 'Теорема Піфагора',
    chapter: 'Розділ 1. Прямокутні трикутники',
    description: 'Геометричне тлумачення та інтерактивне доведення перегрупуванням площ.',
    theory: [
      'Теорема Піфагора — одне з найфундаментальніших тверджень евклідової геометрії. Вона встановлює зв\'язок між сторонами прямокутного трикутника.',
      'Формулювання теореми: у прямокутному трикутнику площа квадрата, побудованого на гіпотенузі, дорівнює сумі площ квадратів, побудованих на катетах.',
      'Алгебраїчна форма запису відома кожному: a² + b² = c², де a та b — довжини катетів, а c — довжина гіпотенузи.',
      'У цьому розділі представлено класичне візуальне доведення методом перегрупування. Ми беремо квадрат зі стороною (a + b) і розміщуємо всередині чотири однакових прямокутних трикутники двома різними способами. Оскільки загальна площа квадрата та площа чотирьох трикутників залишаються незмінними, вільна площа в обох випадках має бути рівною. Це означає, що площа великого квадрата c² дорівнює сумі площ двох менших квадратів a² та b².'
    ],
    steps: [
      {
        title: 'Крок 1. Геометричний зміст',
        description: 'Побудуємо прямокутний трикутник з катетами a = 3, b = 4 та гіпотенузою c = 5. Зведемо квадрати на кожній зі сторін трикутника. Площа червоного квадрата дорівнює a² = 9. Площа синього — b² = 16. Площа зеленого — c² = 25. Легко перевірити, що 9 + 16 = 25, тобто площа квадрата на гіпотенузі точно дорівнює сумі площ квадратів на катетах.',
        svgPath: pythagorasStep1Url,
        asyCode: pythagorasStep1Code
      },
      {
        title: 'Крок 2. Перше розташування (Площа c²)',
        description: 'Розглянемо великий квадрат зі стороною a + b = 7. Розмістимо в його кутах чотири копії нашого трикутника. У центрі утворюється нахилений квадрат зі стороною c = 5. Вільна площа всередині великого квадрата дорівнює площі цього зеленого квадрата, тобто c² = 25.',
        svgPath: pythagorasStep2Url,
        asyCode: pythagorasStep2Code
      },
      {
        title: 'Крок 3. Перегрупування (Площі a² та b²)',
        description: 'Пересунемо чотири трикутники так, щоб вони утворили два прямокутники розміром a × b в кутах. Тепер вільна площа розділилася на два окремих квадрати: червоний квадрат площею a² = 9 та синій квадрат площею b² = 16. Оскільки сумарна вільна площа в обох випадках однакова, ми наочно бачимо, що c² = a² + b² (25 = 9 + 16). Доведення завершено!',
        svgPath: pythagorasStep3Url,
        asyCode: pythagorasStep3Code
      }
    ]
  },
  {
    id: 'triangle-angles',
    title: 'Сума кутів трикутника',
    chapter: 'Розділ 2. Властивості трикутників',
    description: 'Властивість суми внутрішніх кутів трикутника на евклідовій площині.',
    theory: [
      'Сума кутів будь-якого трикутника на евклідовій площині завжди дорівнює 180° (або π радіан).',
      'Ця теорема є прямим наслідком аксіоми про паралельні прямі (п\'ятого постулату Евкліда). Якщо провести через одну з вершин трикутника пряму, паралельну протилежній стороні, то утворяться рівні внутрішні різносторонні кути, які разом з кутом при вершині складають розгорнутий кут 180°.'
    ],
    // Graphics not implemented yet, showing that it's easy to add
    steps: []
  },
  {
    id: 'inscribed-angles',
    title: 'Вписані кути та кола',
    chapter: 'Розділ 3. Коло та круг',
    description: 'Зв\'язок між вписаним та центральним кутами, що спираються на одну дугу.',
    theory: [
      'Вписаний кут — це кут, вершина якого лежить на колі, а сторони перетинають це коло.',
      'Теорема про вписаний кут стверджує: вписаний кут дорівнює половині центрального кута, що спирається на ту саму дугу. Як наслідок, усі вписані кути, які спираються на одну й ту саму дугу, є рівними між собою, а вписаний кут, що спирається на діаметр, завжди дорівнює 90°.'
    ],
    steps: []
  }
];

/**
 * Organizes topics into hierarchical chapters/sections for the sidebar.
 */
export const getChapters = (): Chapter[] => {
  const chaptersMap: Record<string, { id: string; title: string }[]> = {};
  
  topics.forEach(topic => {
    if (!chaptersMap[topic.chapter]) {
      chaptersMap[topic.chapter] = [];
    }
    chaptersMap[topic.chapter].push({ id: topic.id, title: topic.title });
  });

  return Object.entries(chaptersMap).map(([title, topicsList]) => ({
    title,
    topics: topicsList
  }));
};
