import React from 'react';
import './Background.css';
import TunnelEffect from '../TunnelEffect/TunnelEffect';

interface BackgroundProps {
  hideBackgroundEffect: boolean; // Prop to control visibility of the TunnelEffect
}

const Background: React.FC<BackgroundProps> = ({ hideBackgroundEffect }) => {
  return (
    <div className="background">
      {!hideBackgroundEffect && <TunnelEffect />}
    </div>
  );
};

export default Background;