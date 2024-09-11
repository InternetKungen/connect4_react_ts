import React from 'react';
import './Background.css';
import TunnelEffect from '../TunnelEffect/TunnelEffect';

interface BackgroundProps {
  hideBackgroundEffect: boolean;
}

const Background: React.FC<BackgroundProps> = ({ hideBackgroundEffect }) => {
  return (
    <div className={`background ${hideBackgroundEffect ? 'hidden' : ''}`}>
      {!hideBackgroundEffect && <TunnelEffect />}
    </div>
  );
};

export default Background;
