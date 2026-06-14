import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, BookOpen, Sparkles, Info } from 'lucide-react';
import { getChapters } from '../../entities/topic/model/topics';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Sidebar component that acts as the interactive table of contents.
 * Groups topics into chapters and provides seamless routing.
 */
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const chapters = getChapters();

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.isOpen : ''}`}>
      <div className={styles.titleSection}>
        <h3>Навігація</h3>
        <button className={styles.closeButton} onClick={onClose} aria-label="Сховати зміст">
          <X size={18} />
        </button>
      </div>
      <div className={styles.chaptersList}>
        {/* Global Navigation Group */}
        <div className={`${styles.chapterGroup} ${styles.navGroup}`}>
          <ul className={styles.topicsList}>
            <li>
              <NavLink
                to="/topic/pythagorean-theorem"
                className={({ isActive }) => `${styles.topicLink} ${isActive ? styles.activeTopic : ''}`}
                onClick={onClose}
              >
                <BookOpen size={16} className={styles.navIcon} />
                <span>Підручник</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/showcase"
                className={({ isActive }) => `${styles.topicLink} ${isActive ? styles.activeTopic : ''}`}
                onClick={onClose}
              >
                <Sparkles size={16} className={styles.navIcon} />
                <span>Демонстрація</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => `${styles.topicLink} ${isActive ? styles.activeTopic : ''}`}
                onClick={onClose}
              >
                <Info size={16} className={styles.navIcon} />
                <span>Про проект</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={styles.divider}></div>

        {chapters.map((chapter, index) => (
          <div key={index} className={styles.chapterGroup}>
            <div className={styles.chapterTitle}>{chapter.title}</div>
            <ul className={styles.topicsList}>
              {chapter.topics.map(topic => (
                <li key={topic.id}>
                  <NavLink
                    to={`/topic/${topic.id}`}
                    className={({ isActive }) => `${styles.topicLink} ${isActive ? styles.activeTopic : ''}`}
                    onClick={onClose}
                  >
                    <span className={styles.bullet}></span>
                    <span>{topic.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};
