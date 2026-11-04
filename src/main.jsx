import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { RadioProvider } from './components/RadioPlayer.jsx';
import './styles/tokens.css';
import './styles/fonts-poster.css';
import './styles/chrome.css';
import './styles/sections.css';
import './styles/marquee.css';
import './styles/motion.css';
import './styles/animation.css';
import './styles/reconstruction.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RadioProvider>
        <App />
      </RadioProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
