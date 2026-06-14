import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './widgets/Navbar/Navbar';
import { Sidebar } from './widgets/Sidebar/Sidebar';
import { TopicDetailPage } from './pages/TopicDetailPage/TopicDetailPage';
import { AboutPage } from './pages/AboutPage/AboutPage';

/**
 * Root Application Component.
 * Integrates routing using HashRouter (crucial for GitHub Pages hosting)
 * and lays out the FSD layers (Navbar, Sidebar, Pages).
 */
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <HashRouter>
      <div className="app-container">
        {/* Universal Top Navigation Header */}
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="main-layout">
          {/* Collapsible Sidebar Overlay */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Backdrop for closing the sidebar when clicking outside */}
          {isSidebarOpen && (
            <div 
              className="sidebar-backdrop" 
              onClick={() => setIsSidebarOpen(false)} 
            />
          )}

          <Routes>
            {/* Textbook Route Group */}
            <Route 
              path="/topic/:topicId" 
              element={
                <main className="content-area">
                  <TopicDetailPage />
                </main>
              } 
            />

            {/* About Page: Full-width layout */}
            <Route 
              path="/about" 
              element={
                <main className="content-area" style={{ maxWidth: '1000px' }}>
                  <AboutPage />
                </main>
              } 
            />

            {/* Fallback & landing redirection directly to the first textbook topic */}
            <Route path="*" element={<Navigate to="/topic/pythagorean-theorem" replace />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
