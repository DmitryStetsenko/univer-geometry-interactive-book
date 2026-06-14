import React from 'react';
import { Cpu, Code, Boxes, GraduationCap, Zap } from 'lucide-react';
import styles from './DevelopmentPage.module.css';

/**
 * DevelopmentPage component.
 * Describes the project roadmap, future enhancements, and specifically details the concept
 * of backend-driven dynamic rendering of Asymptote graphics for live interactivity.
 */
export const DevelopmentPage: React.FC = () => {
  return (
    <div className={styles.devContainer}>
      <section className={styles.heroSection}>
        <h1>Розвиток проєкту «Геометрія.asy»</h1>
        <p>
          Бачення майбутнього інтерактивної освіти: перехід від статичних ілюстрацій 
          до динамічного математичного середовища моделювання в реальному часі.
        </p>
      </section>

      <div className={styles.backendAlert}>
        <div className={styles.backendAlertTitle}>
          <Cpu size={22} />
          <span>Ключовий вектор: Динамічний рендеринг на бекенді</span>
        </div>
        <p>
          Зараз усі геометричні побудови компілюються за допомогою Asymptote статично під час розробки. 
          Проте, розробка повноцінного <strong>бекенд-сервісу</strong> (наприклад, на Node.js чи Python із ізольованим 
          оточенням для компіляції <code>asy</code>) відкриє шлях до справжньої динамічної інтерактивності. 
          Користувач зможе мишкою переміщувати точки на екрані, фронтенд надсилатиме нові координати 
          на бекенд, який за мілісекунди рендеритиме оновлений SVG-малюнок і повертатиме його клієнту. 
          Це дозволить проводити експерименти, змінювати параметри теорем на льоту і миттєво спостерігати результат.
        </p>
      </div>

      <h2 className={styles.sectionTitle}>Перспективні напрямки розширення</h2>
      
      <section className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Code size={24} />
            <h2>Живий редактор (Live Playground)</h2>
          </div>
          <p>
            Інтеграція веб-редактора коду безпосередньо в підручник. Студенти та вчителі зможуть 
            писати код Asymptote прямо в браузері, запускати компіляцію на сервері та бачити 
            результат побудови у сусідньому вікні в реальному часі.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Boxes size={24} />
            <h2>Стереометрія та 3D моделі</h2>
          </div>
          <p>
            Перехід до тривимірного простору. Використовуючи потужні 3D-можливості Asymptote та WebGL, 
            можна створювати інтерактивні моделі призм, пірамід, сфер та перерізів тіл обертання, 
            які користувач зможе обертати та масштабувати.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <GraduationCap size={24} />
            <h2>Інтеграція з LMS (Освітніми системами)</h2>
          </div>
          <p>
            Підтримка стандартів SCORM чи LTI для інтеграції підручника з Moodle, Google Classroom 
            та іншими системами управління навчанням. Це дозволить автоматично перевіряти 
            геометричні завдання та фіксувати прогрес учнів.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Zap size={24} />
            <h2>Анімаційні переходи</h2>
          </div>
          <p>
            Впровадження CSS Morphing для ліній та фігур. При переході між кроками доведення теореми, 
            точки та лінії плавно змінюватимуть своє положення, наочно показуючи процес 
            геометричного перетворення, а не просто перемикаючи слайди.
          </p>
        </div>
      </section>

      <h2 className={styles.sectionTitle}>Дорожня карта розробки (Roadmap)</h2>

      <section className={styles.roadmapTimeline}>
        <div className={styles.timelineItem}>
          <div className={styles.timelineBadge}>Етап 1. Теорія</div>
          <div className={styles.timelineContent}>
            <h4>Статичний підручник та базова графіка</h4>
            <p>
              Створення структури проєкту за методологією Feature-Sliced Design (FSD), 
              верстка тем з планіметрії та інтеграція статично згенерованого SVG-матеріалу. (Виконано)
            </p>
          </div>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.timelineBadge}>Етап 2. Анімація</div>
          <div className={styles.timelineContent}>
            <h4>Мікро-взаємодії та покращення UX</h4>
            <p>
              Оптимізація мобільної версії, додавання зуму/панорамування для ілюстрацій, 
              перемикачів відображення коду Asymptote та покращення навігації книгою. (Поточний етап)
            </p>
          </div>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.timelineBadge}>Етап 3. Бекенд</div>
          <div className={styles.timelineContent}>
            <h4>Розробка API-сервера рендерингу Asymptote</h4>
            <p>
              Створення контейнеризованого мікросервісу на базі Docker/Node.js, який прийматиме код 
              Asymptote у форматі JSON/Text та повертатиме оптимізований SVG. Налаштування кешування.
            </p>
          </div>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.timelineBadge}>Етап 4. Інтерактив</div>
          <div className={styles.timelineContent}>
            <h4>Повністю динамічний інтерфейс користувача</h4>
            <p>
              Розробка drag-and-drop вершин фігур на фронтенді, реалізація повзунків зміни 
              параметрів геометричних об'єктів та динамічні HTTP/WebSocket запити до бекенд-компілятора.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
