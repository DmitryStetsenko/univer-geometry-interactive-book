import React from 'react';
import { Layers, Compass, HelpCircle, ExternalLink } from 'lucide-react';
import styles from './AboutPage.module.css';

/**
 * AboutPage component.
 * Displays project documentation, structure description, FSD architecture,
 * and detailed guide on how to add new geometry topics and compile Asymptote files.
 */
export const AboutPage: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.heroSection}>
        <h1>Інтерактивний підручник з геометрії v1.0</h1>
        <p>
          Сучасний освітній веб-інструмент, який поєднує теоретичний матеріал з кроковими
          інтерактивними ілюстраціями, сгенерованими за допомогою мови опису графіки Asymptote.
        </p>
        
        <div className={styles.repoBadge}>
          <a 
            href="https://github.com/DmitryStetsenko/univer-geometry-interactive-book" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.repoLink}
          >
            <svg 
              viewBox="0 0 24 24" 
              width="18" 
              height="18" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            <span>Репозиторій проєкту на GitHub</span>
            <ExternalLink size={12} className={styles.externalIcon} />
          </a>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Compass size={24} />
            <h2>Візуалізація Asymptote</h2>
          </div>
          <p>
            Малюнки та геометричні побудови генеруються за допомогою Asymptote в окремих файлах.
            Вони компілюються у чистий векторний формат SVG і підвантажуються в інтерфейс сторінок,
            забезпечуючи ідеальну чіткість при масштабуванні.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Layers size={24} />
            <h2>Архітектура FSD</h2>
          </div>
          <p>
            Проект побудовано відповідно до методології Feature-Sliced Design (FSD). 
            Це робить кодову базу модульною, передбачуваною та легкою для розширення новими
            компонентами чи функціоналом.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <HelpCircle size={24} />
            <h2>Книжкова навігація</h2>
          </div>
          <p>
            Навігація організована за розділами у вигляді бічного змісту книги. Також є кнопки
            посторінкового гортання («Назад» та «Вперед») для послідовного вивчення матеріалу.
          </p>
        </div>
      </section>

      <section className={styles.docContent}>
        <h2 className={styles.sectionTitle}>Технічна документація проекту</h2>
        
        <h3>1. Структура папок за FSD</h3>
        <p>Код розділений на спеціальні шари для оптимальної організації:</p>
        <ul>
          <li><strong>app/</strong> — Ініціалізація додатку, роутинг (HashRouter) та глобальні стилі (<code>index.css</code>).</li>
          <li><strong>pages/</strong> — Головні сторінки: <code>AboutPage</code> (ця сторінка) та <code>TopicDetailPage</code> (візуалізація тем).</li>
          <li><strong>widgets/</strong> — Крупні блоки інтерфейсу: <code>Navbar</code> (хедер сайту) та <code>Sidebar</code> (зміст підручника).</li>
          <li><strong>entities/</strong> — Бізнес-сутність геометричної теми: типи (<code>types.ts</code>) та центральний конфіг (<code>topics.ts</code>).</li>
          <li><strong>shared/</strong> — Спільні компоненти та статичні асети. Графіка Asymptote винесена сюди: <code>shared/assets/asymptote/</code>.</li>
        </ul>

        <div className={styles.alert}>
          <div className={styles.alertTitle}>💡 Важливо про розділення графіки:</div>
          Вхідний код Asymptote (<code>*.asy</code>) та скомпільовані векторні малюнки (<code>*.svg</code>) лежать в окремій папці <strong>src/shared/assets/asymptote</strong>. Вони повністю ізольовані від логіки відображення додатку.
        </div>

        <h3>2. Як додати нову тему (Крок за кроком)</h3>
        <p>Додавання нової теми реалізовано максимально декларативно та просто:</p>
        <ol>
          <li>
            <strong>Створення графіки в Asymptote:</strong>
            <br />
            У папці <code>src/shared/assets/asymptote/</code> створіть один або декілька файлів графіки для кроків вашої теми. Наприклад: <code>my_topic_step1.asy</code>.
            <br />
            Зверніть увагу, що у файлі обов'язково має бути встановлено формат виводу:
            <pre className={styles.codeBlock}>settings.outformat="svg";</pre>
          </li>
          <li>
            <strong>Компіляція у SVG:</strong>
            <br />
            Відкрийте консоль та запустіть команду Asymptote для збірки графіки:
            <pre className={styles.codeBlock}>asy -f svg my_topic_step1.asy</pre>
            У результаті ви отримаєте файл <code>my_topic_step1.svg</code>.
          </li>
          <li>
            <strong>Додавання метаданих та теорії в конфіг:</strong>
            <br />
            Відкрийте файл <code>src/entities/topic/model/topics.ts</code>. Для правильної інтеграції ресурсів виконайте дві речі:
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', marginBottom: '0.5rem', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '0.25rem' }}>
                <strong>Динамічний резолв SVG:</strong> Оскільки під час збірки Vite оптимізує, хешує та переміщує статичні асети, посилання на SVG-зображення потрібно створювати через <code>new URL('шлях_до_svg', import.meta.url).href</code>. Це гарантує правильне відображення ілюстрацій після деплою (наприклад, на GitHub Pages).
              </li>
              <li>
                <strong>Імпорт сирого коду Asymptote:</strong> Імпортуйте вихідний код <code>.asy</code> як сирий рядок за допомогою суфіксу <code>?raw</code>. Це дозволяє уникнути ручного копіювання коду.
              </li>
            </ul>
            Приклад оголошення на початку файлу <code>topics.ts</code>:
            <pre className={styles.codeBlock}>
{`// 1. Динамічне вирішення шляху до SVG
const myTopicStep1Url = new URL('../../../shared/assets/asymptote/my_topic_step1.svg', import.meta.url).href;

// 2. Імпорт вихідного коду Asymptote як тексту
import myTopicStep1Code from '../../../shared/assets/asymptote/my_topic_step1.asy?raw';`}
            </pre>
            Після цього додайте новий об'єкт теми у масив <code>topics</code>:
            <pre className={styles.codeBlock}>
{`{
  id: 'my-new-topic',
  title: 'Назва теми',
  chapter: 'Розділ 2. Нові властивості',
  description: 'Короткий опис теми для списку.',
  theory: [
    'Перший абзац теорії...',
    'Другий абзац теорії...'
  ],
  steps: [
    {
      title: 'Крок 1. Назва кроку',
      description: 'Опис першої ілюстрації.',
      svgPath: myTopicStep1Url,
      asyCode: myTopicStep1Code
    }
  ]
}`}
            </pre>
          </li>
          <li>
            <strong>Перевірка та деплой:</strong>
            <br />
            Тема автоматично з'явиться у бічній навігації (Sidebar) та буде доступна за адресою <code>#/topic/my-new-topic</code>. Навігаційні кнопки попередньої/наступної тем перерахуються самі!
          </li>
        </ol>

        <div className={styles.alert} style={{ borderLeftColor: 'var(--accent)', backgroundColor: 'rgba(236, 72, 153, 0.05)' }}>
          <div className={styles.alertTitle} style={{ color: 'var(--accent)' }}>🚀 Готовність до GitHub Pages:</div>
          Завдяки використанню HashRouter, проект можна скомпілювати командою <code>npm run build</code> і вивантажити на GitHub Pages. Маршрутизація не зламається, а відносні шляхи до картинок підвантажаться коректно на будь-якому піддомені.
        </div>
      </section>
    </div>
  );
};
