import React from 'react';
import { NavLink } from 'react-router-dom';
import { getChapters } from '../../entities/topic/model/topics';
import styles from './Sidebar.module.css';

/**
 * Sidebar component that acts as the interactive table of contents.
 * Groups topics into chapters and provides seamless routing.
 */
export const Sidebar: React.FC = () => {
  const chapters = getChapters();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.titleSection}>
        <h3>Зміст підручника</h3>
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
