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
  return (
    <HashRouter>
      <div className="app-container">
        {/* Universal Top Navigation Header */}
        <Navbar />

        <div className="main-layout">
          <Routes>
            {/* Textbook Route Group with index sidebar navigation */}
            <Route 
              path="/topic/:topicId" 
              element={
                <>
                  <Sidebar />
                  <main className="content-area">
                    <TopicDetailPage />
                  </main>
                </>
              } 
            />

            {/* About Page: Full-width layout without sidebar */}
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
