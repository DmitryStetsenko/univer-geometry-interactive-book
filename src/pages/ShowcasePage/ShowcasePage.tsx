import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles, 
  Cpu,
  Contrast,
  Grid,
  Workflow
} from 'lucide-react';
import styles from './ShowcasePage.module.css';

// Resolve SVG URLs
const kochUrl = new URL('../../shared/assets/asymptote/koch_snowflake.svg', import.meta.url).href;
const spiroUrl = new URL('../../shared/assets/asymptote/spirograph.svg', import.meta.url).href;
const lorenzUrl = new URL('../../shared/assets/asymptote/lorenz_attractor.svg', import.meta.url).href;

// Import raw code strings
import kochCode from '../../shared/assets/asymptote/koch_snowflake.asy?raw';
import spiroCode from '../../shared/assets/asymptote/spirograph.asy?raw';
import lorenzCode from '../../shared/assets/asymptote/lorenz_attractor.asy?raw';

interface ShowcaseItemProps {
  title: string;
  subtitle: string;
  description: string;
  mathNotes: string;
  svgPath: string;
  asyCode: string;
  icon: React.ReactNode;
}

const ShowcaseCard: React.FC<ShowcaseItemProps> = ({
  title,
  subtitle,
  description,
  mathNotes,
  svgPath,
  asyCode,
  icon
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Zoom & Pan states
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageBg, setImageBg] = useState<'theme' | 'white' | 'dark' | 'grid'>('theme');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(asyCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 4));
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const next = Math.max(prev - 0.25, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const getBgClass = () => {
    switch (imageBg) {
      case 'white': return styles.bgWhite;
      case 'dark': return styles.bgDark;
      case 'grid': return styles.bgGrid;
      default: return styles.bgTheme;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleArea}>
          <div className={styles.iconBox}>{icon}</div>
          <div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <span className={styles.cardSubtitle}>{subtitle}</span>
          </div>
        </div>
        <button 
          className={`${styles.codeToggleBtn} ${showCode ? styles.activeToggle : ''}`}
          onClick={() => setShowCode(!showCode)}
        >
          <Code2 size={16} />
          <span>{showCode ? 'Сховати код' : 'Вихідний код'}</span>
        </button>
      </div>

      <div className={`${styles.cardBody} ${showCode ? styles.withCode : ''}`}>
        {/* Graphical Section */}
        <div className={styles.visualColumn}>
          <div 
            className={`${styles.imageContainer} ${getBgClass()}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ 
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <img 
              src={svgPath} 
              alt={title} 
              className={styles.svgImage} 
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                transformOrigin: 'center center'
              }}
              draggable={false}
            />

            {/* Backing settings overlay */}
            <div className={styles.bgControls} onMouseDown={(e) => e.stopPropagation()}>
              <button 
                className={imageBg === 'theme' ? styles.activeBgBtn : ''} 
                onClick={() => setImageBg('theme')}
                title="Колір теми"
              >
                <Contrast size={14} />
              </button>
              <button 
                className={imageBg === 'white' ? styles.activeBgBtn : ''} 
                onClick={() => setImageBg('white')}
                title="Білий"
              >
                <div className={`${styles.circlePreview} ${styles.circleWhite}`} />
              </button>
              <button 
                className={imageBg === 'dark' ? styles.activeBgBtn : ''} 
                onClick={() => setImageBg('dark')}
                title="Темний"
              >
                <div className={`${styles.circlePreview} ${styles.circleDark}`} />
              </button>
              <button 
                className={imageBg === 'grid' ? styles.activeBgBtn : ''} 
                onClick={() => setImageBg('grid')}
                title="Сітка"
              >
                <Grid size={14} />
              </button>
            </div>

            {/* Zoom overlay controls */}
            <div className={styles.zoomControls} onMouseDown={(e) => e.stopPropagation()}>
              <button onClick={handleZoomOut} disabled={zoom <= 1} title="Зменшити">
                <ZoomOut size={14} />
              </button>
              <span className={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
              <button onClick={handleZoomIn} disabled={zoom >= 4} title="Збільшити">
                <ZoomIn size={14} />
              </button>
              <button onClick={handleResetZoom} disabled={zoom === 1 && pan.x === 0 && pan.y === 0} title="Скинути">
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <p className={styles.descriptionText}>{description}</p>
            <div className={styles.mathNotes}>
              <strong>Математичний зміст:</strong> {mathNotes}
            </div>
          </div>
        </div>

        {/* Code Viewer Section */}
        {showCode && (
          <div className={styles.codeColumn}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLang}>Asymptote Source Code</span>
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? <Check size={14} className={styles.copySuccess} /> : <Copy size={14} />}
                <span>{copied ? 'Скопійовано!' : 'Копіювати'}</span>
              </button>
            </div>
            <div className={styles.codeBody}>
              <pre><code>{asyCode}</code></pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ShowcasePage: React.FC = () => {
  return (
    <div className={styles.showcaseContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Демонстрація можливостей Asymptote</h1>
        <p className={styles.pageSubtitle}>
          Приклади складного алгоритмічного малювання. Тут ви можете побачити використання циклів, рекурсій та математичних формул для генерації векторної графіки.
        </p>
      </div>

      <div className={styles.cardsGrid}>
        <ShowcaseCard 
          title="Сніжинка Коха"
          subtitle="Рекурсивний геометричний фрактал"
          description="Фрактал побудований шляхом рекурсивного поділу відрізків трикутника. На кожному кроці середня частина відрізка замінюється рівностороннім трикутником без основи. Цей процес повторюється нескінченно, утворюючи фрактальну структуру з нескінченним периметром та скінченною площею."
          mathNotes="Для генерації цього малюнку в Asymptote написана рекурсивна функція з глибиною N=4. Обчислення координат вершин та побудова єдиного замкнутого шляху (path) виконуються автоматично на етапі компіляції."
          svgPath={kochUrl}
          asyCode={kochCode}
          icon={<Cpu className={styles.headerIcon} size={24} />}
        />

        <ShowcaseCard 
          title="Інтерактивний спірограф"
          subtitle="Параметрична крива гіпотрохоїди"
          description="Крива, яка утворюється точкою, закріпленою на колі, що котиться всередині іншого кола. Змінюючи радіуси кіл та відстань до точки, можна отримати безліч різноманітних геометричних візерунків гармонійної форми."
          mathNotes="Програма використовує параметричні рівняння для обчислення масиву з 1000 точок у циклі. Візуалізація складається з трьох накладених кривих з різними геометричними параметрами та контрастними фірмовими кольорами."
          svgPath={spiroUrl}
          asyCode={spiroCode}
          icon={<Sparkles className={styles.headerIcon} size={24} />}
        />

        <ShowcaseCard 
          title="Атрактор Лоренца"
          subtitle="Хаотична тривимірна траєкторія"
          description="Знаменита нелінійна динамічна система з детермінованим хаосом (так званий «ефект метелика»). Траєкторія руху точки в тривимірному просторі ніколи не повторює себе, утворюючи красиву нескінченно складну двокрилу фрактальну структуру."
          mathNotes="Програма моделює систему трьох диференціальних рівнянь Лоренца шляхом чисельного інтегрування (4000 кроків циклу). Координати 3D обертаються навколо вертикальної осі на 45 градусів і проектуються на двовимірну площину, а колір лінії плавно перетікає від індиго до рожевого залежно від кроку інтегрування."
          svgPath={lorenzUrl}
          asyCode={lorenzCode}
          icon={<Workflow className={styles.headerIcon} size={24} />}
        />
      </div>
    </div>
  );
};
