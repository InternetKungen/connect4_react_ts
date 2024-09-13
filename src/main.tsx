import './index.css';
import './assets/css/responsive.css';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Background from './components/Background/Background.tsx';
function Main() {
  const [hideBackgroundEffect, setHideBackgroundEffect] = useState<boolean>(false);

  return (
    <StrictMode>
      <Background hideBackgroundEffect={hideBackgroundEffect} />
      <App setHideBackgroundEffect={setHideBackgroundEffect} hideBackgroundEffect={hideBackgroundEffect} />
    </StrictMode>
  );
}

createRoot(document.querySelector('#root')!).render(<Main />);