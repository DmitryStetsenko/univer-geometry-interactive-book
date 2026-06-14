import type { Topic, Chapter } from './types';

// Resolve SVG URLs using Vite's dynamic asset loading mechanism
const pythagorasStep1Url = new URL('../../../shared/assets/asymptote/pythagoras_step1.svg', import.meta.url).href;
const pythagorasStep2Url = new URL('../../../shared/assets/asymptote/pythagoras_step2.svg', import.meta.url).href;
const pythagorasStep3Url = new URL('../../../shared/assets/asymptote/pythagoras_step3.svg', import.meta.url).href;

// Asymptote code snippets for reference/documentation view
const codeStep1 = `settings.outformat="svg";
size(300);

pair A = (0, 0);
pair B = (4, 0);
pair C = (0, 3);

// Draw the squares
fill(A--(A+(-3,0))--(C+(-3,0))--C--cycle, rgb(255, 230, 230));
draw(A--(A+(-3,0))--(C+(-3,0))--C--cycle, rgb(220, 50, 50)+1.5bp);

fill(A--(A+(0,-4))--(B+(0,-4))--B--cycle, rgb(230, 240, 255));
draw(A--(A+(0,-4))--(B+(0,-4))--B--cycle, rgb(50, 100, 220)+1.5bp);

pair B_sq = B + (3, 4);
pair C_sq = C + (3, 4);
fill(B--B_sq--C_sq--C--cycle, rgb(230, 255, 230));
draw(B--B_sq--C_sq--C--cycle, rgb(50, 180, 50)+1.5bp);

// Draw the main triangle
filldraw(A--B--C--cycle, rgb(245, 245, 245), black+2bp);
draw((0,0.3)--(0.3,0.3)--(0.3,0), black+1bp);

// Labels
label("$a = 3$", (A+C)/2, W);
label("$b = 4$", (A+B)/2, N);
label("$c = 5$", (B+C)/2, align=NE);

label("$a^2 = 9$", (A+(-1.5, 1.5)), rgb(220, 50, 50));
label("$b^2 = 16$", (A+(2, -2)), rgb(50, 100, 220));
label("$c^2 = 25$", (A+(3.5, 3.5)), rgb(50, 180, 50));`;

const codeStep2 = `settings.outformat="svg";
size(300);

real a = 3;
real b = 4;
real c = 5;
real s = a + b; // 7

draw((0,0)--(s,0)--(s,s)--(0,s)--cycle, black+1bp);

// 4 Triangles
filldraw((0,0)--(b,0)--(0,a)--cycle, rgb(245, 245, 245), black+1.5bp);
filldraw((s,0)--(s,b)--(b,0)--cycle, rgb(245, 245, 245), black+1.5bp);
filldraw((s,s)--(a,s)--(s,b)--cycle, rgb(245, 245, 245), black+1.5bp);
filldraw((0,s)--(0,a)--(a,s)--cycle, rgb(245, 245, 245), black+1.5bp);

// Central square c^2
filldraw((b,0)--(s,b)--(a,s)--(0,a)--cycle, rgb(230, 255, 230), rgb(50, 180, 50)+1.5bp);

// Outer side labels
label("$b=4$", (b/2, 0), S);
label("$a=3$", (b + a/2, 0), S);
label("$b=4$", (s, b/2), E);
label("$a=3$", (s, b + a/2), E);
label("$b=4$", (s - b/2, s), N);
label("$a=3$", (s - b - a/2, s), N);
label("$b=4$", (0, s - b/2), W);
label("$a=3$", (0, s - b - a/2), W);

// Hypotenuses & area
label("$c=5$", (b/2, a/2), align=NE);
label("$c=5$", (b + a/2, b/2), align=NW);
label("$c=5$", (s - b/2, s - a/2), align=SW);
label("$c=5$", (a/2, s - b/2), align=SE);
label("$c^2$", (s/2, s/2), rgb(50, 180, 50));
label("Area = 25", (s/2, s/2 - 0.4), rgb(50, 180, 50));`;

const codeStep3 = `settings.outformat="svg";
size(300);

real a = 3;
real b = 4;
real s = a + b; // 7

draw((0,0)--(s,0)--(s,s)--(0,s)--cycle, black+1bp);

// Rectangle 1 (Bottom-Left)
filldraw((0,0)--(b,0)--(0,a)--cycle, rgb(245, 245, 245), black+1.5bp);
filldraw((b,a)--(b,0)--(0,a)--cycle, rgb(245, 245, 245), black+1.5bp);

// Rectangle 2 (Top-Right)
filldraw((b,a)--(s,a)--(s,s)--cycle, rgb(245, 245, 245), black+1.5bp);
filldraw((b,s)--(b,a)--(s,s)--cycle, rgb(245, 245, 245), black+1.5bp);

// Square a^2
filldraw((b,0)--(s,0)--(s,a)--(b,a)--cycle, rgb(255, 230, 230), rgb(220, 50, 50)+1.5bp);

// Square b^2
filldraw((0,a)--(b,a)--(b,s)--(0,s)--cycle, rgb(230, 240, 255), rgb(50, 100, 220)+1.5bp);

// Outer side labels
label("$b=4$", (b/2, 0), S);
label("$a=3$", (b + a/2, 0), S);
label("$a=3$", (s, a/2), E);
label("$b=4$", (s, a + b/2), E);
label("$b=4$", (b/2, s), N);
label("$a=3$", (b + a/2, s), N);
label("$a=3$", (0, a/2), W);
label("$b=4$", (0, a + b/2), W);

// Inner area labels
label("$a^2$", (b + a/2, a/2), rgb(220, 50, 50));
label("Area = 9", (b + a/2, a/2 - 0.4), rgb(220, 50, 50));
label("$b^2$", (b/2, a + b/2), rgb(50, 100, 220));
label("Area = 16", (b/2, a + b/2 - 0.4), rgb(50, 100, 220));`;

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
        asyCode: codeStep1
      },
      {
        title: 'Крок 2. Перше розташування (Площа c²)',
        description: 'Розглянемо великий квадрат зі стороною a + b = 7. Розмістимо в його кутах чотири копії нашого трикутника. У центрі утворюється нахилений квадрат зі стороною c = 5. Вільна площа всередині великого квадрата дорівнює площі цього зеленого квадрата, тобто c² = 25.',
        svgPath: pythagorasStep2Url,
        asyCode: codeStep2
      },
      {
        title: 'Крок 3. Перегрупування (Площі a² та b²)',
        description: 'Пересунемо чотири трикутники так, щоб вони утворили два прямокутники розміром a × b в кутах. Тепер вільна площа розділилася на два окремих квадрати: червоний квадрат площею a² = 9 та синій квадрат площею b² = 16. Оскільки сумарна вільна площа в обох випадках однакова, ми наочно бачимо, що c² = a² + b² (25 = 9 + 16). Доведення завершено!',
        svgPath: pythagorasStep3Url,
        asyCode: codeStep3
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
