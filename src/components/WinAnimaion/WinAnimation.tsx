import './WinAnimation.css';

interface WinAnimationProps {
  winner: string | null;
  winnerSymbol: string | null;
  onClose: () => void;
  onQuit: () => void;
}

const WinAnimation: React.FC<WinAnimationProps> = ({ winner, winnerSymbol, onClose, onQuit }) => {
  const winnerClass = winnerSymbol === 'X' ? 'winner-x' : winnerSymbol === 'O' ? 'winner-o' : 'winner-tie';
  return (
    <div className={`win-animation-container ${winnerClass}`}>
      <div className="outer-frame">
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