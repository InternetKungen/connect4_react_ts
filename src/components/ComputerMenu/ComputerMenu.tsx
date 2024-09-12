import './ComputerMenu.css';
import useSound from '../../hooks/useSound';

import clickMouseDownSound from '../../assets/sounds/clickMouseDownButtonBack.mp3';
import clickMouseUpSound from '../../assets/sounds/clickMouseUpStartGame.mp3';

interface ComputerDifficulty {
  onSelectDifficulty: (difficulty: 'easy' | 'hard') => void;
}

const ComputerMenu: React.FC<ComputerDifficulty> = ({ onSelectDifficulty }) => {
  
  /*Bind Sounds*/
  const { playSound: playClickMouseDownButton } = useSound(clickMouseDownSound, 0.8);
  const { playSound: playClickMouseUpStartGame } = useSound(clickMouseUpSound, 0.8);

  return (
    <section className="computer-menu">
      <h3>Select Difficulty</h3>
      <button className="button" onMouseDown={() => playClickMouseDownButton()} onMouseUp={() => playClickMouseUpStartGame()} onClick={() => onSelectDifficulty('easy')}>Easy</button>
      <button className="button" onMouseDown={() => playClickMouseDownButton()} onMouseUp={() => playClickMouseUpStartGame()} onClick={() => onSelectDifficulty('hard')}>Hard</button>
    </section>
  )
}

export default ComputerMenu;