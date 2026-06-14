import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, BookOpen, Info, Menu } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

/**
 * Navbar component for the textbook.
 * Provides the application header, brand identity (logo), and top-level navigation.
 */
export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
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
      </nav>
    </header>
  );
};
