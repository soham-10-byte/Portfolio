import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

if (
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  document.documentElement.classList.add('scroll-reveal-ready');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

