
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LorePage from './components/LorePage';
import { LORE_TOPICS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-bays-dark font-sans">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {LORE_TOPICS.map(topic => (
            <Route 
              key={topic.slug} 
              path={`/lore/${topic.slug}`} 
              element={<LorePage topic={topic} />} 
            />
          ))}
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
