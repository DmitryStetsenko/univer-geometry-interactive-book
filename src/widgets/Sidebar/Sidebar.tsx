import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
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
        <h3>Зміст підручника</h3>
        <button className={styles.closeButton} onClick={onClose} aria-label="Сховати зміст">
          <X size={18} />
        </button>
      </div>
      <div className={styles.chaptersList}>
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
