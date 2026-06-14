import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, BookOpen, Info, Menu, Palette, Sun, Moon, Check } from 'lucide-react';
import styles from './Navbar.module.css';

export type ThemeMode = 'light' | 'dark';
export type AccentColor = 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky';

interface NavbarProps {
  onToggleSidebar?: () => void;
  themeMode: ThemeMode;
  accentColor: AccentColor;
  onChangeThemeMode: (mode: ThemeMode) => void;
  onChangeAccentColor: (color: AccentColor) => void;
}

/**
 * Navbar component for the textbook.
 * Provides the application header, brand identity (logo), top-level navigation,
 * and appearance settings popover (theme mode and dynamic color configuration).
 */
export const Navbar: React.FC<NavbarProps> = ({ 
  onToggleSidebar,
  themeMode,
  accentColor,
  onChangeThemeMode,
  onChangeAccentColor
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close settings popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const accents: { id: AccentColor; color: string; name: string }[] = [
    { id: 'indigo', color: '#6366f1', name: 'Індиго' },
    { id: 'emerald', color: '#10b981', name: 'Смарагд' },
    { id: 'amber', color: '#f59e0b', name: 'Бурштин' },
    { id: 'rose', color: '#f43f5e', name: 'Троянда' },
    { id: 'sky', color: '#0ea5e9', name: 'Небо' },
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.leftSection}>
        {onToggleSidebar && (
          <button className={styles.menuButton} onClick={onToggleSidebar} aria-label="Toggle Sidebar">
            <Menu size={20} />
            <span>Зміст</span>
          </button>
        )}
        <div className={styles.logoContainer}>
          <Compass className={styles.logoIcon} size={28} />
          <span className={styles.logoText}>Геометрія<span>.asy</span></span>
        </div>
      </div>
      <nav className={styles.navMenu}>
        <NavLink 
          to="/topic/pythagorean-theorem" 
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
        >
          <BookOpen size={18} />
          <span>Підручник</span>
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
        >
          <Info size={18} />
          <span>Про проект</span>
        </NavLink>

        {/* Theme Settings Control */}
        <div className={styles.settingsWrapper} ref={settingsRef}>
          <button 
            className={`${styles.navButton} ${isSettingsOpen ? styles.activeButton : ''}`}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            title="Налаштування вигляду"
          >
            <Palette size={18} />
            <span className={styles.settingsLabel}>Вигляд</span>
          </button>

          {isSettingsOpen && (
            <div className={styles.settingsDropdown}>
              <h4 className={styles.settingsTitle}>Налаштування теми</h4>
              
              <div className={styles.settingsSection}>
                <span className={styles.sectionLabel}>Режим:</span>
                <div className={styles.themeToggleRow}>
                  <button 
                    className={`${styles.themeModeBtn} ${themeMode === 'light' ? styles.activeMode : ''}`}
                    onClick={() => onChangeThemeMode('light')}
                  >
                    <Sun size={14} />
                    <span>Світла</span>
                  </button>
                  <button 
                    className={`${styles.themeModeBtn} ${themeMode === 'dark' ? styles.activeMode : ''}`}
                    onClick={() => onChangeThemeMode('dark')}
                  >
                    <Moon size={14} />
                    <span>Темна</span>
                  </button>
                </div>
              </div>

              <div className={styles.settingsSection}>
                <span className={styles.sectionLabel}>Колір акценту:</span>
                <div className={styles.accentColorsGrid}>
                  {accents.map((acc) => (
                    <button
                      key={acc.id}
                      className={`${styles.accentCircle} ${accentColor === acc.id ? styles.activeAccent : ''}`}
                      style={{ backgroundColor: acc.color }}
                      onClick={() => onChangeAccentColor(acc.id)}
                      title={acc.name}
                    >
                      {accentColor === acc.id && <Check size={12} className={styles.checkIcon} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
