import './WinAnimation.css';

interface WinAnimationProps {
  winner: string | null;
  onClose: () => void;
  onQuit: () => void;
}

const WinAnimation: React.FC<WinAnimationProps> = ({ winner, onClose, onQuit }) => {

  return (
    <div className="win-animation-container">
      <div className="outer-frame">
        <div className="outer-frame__front"></div>
        <div className="outer-frame__back">
          <div className="inner-frame-rotate">
          <div className="inner-frame">
            <div className="inner-frame__front"></div>
            <div className="inner-frame__back">
              <div className="inner-frame__back__content">
                <h2>{winner ? `${winner} has won!` : "It's a tie!"}</h2>
                  <div className='inner-frame__back__content__button-container'>
                    <button onClick={onClose}>Play Again</button>
                    <button onClick={onQuit}>Back to Menu</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinAnimation;