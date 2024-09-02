import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Background from './component/Background.tsx';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <Background />
    <App />
  </StrictMode>,
);
