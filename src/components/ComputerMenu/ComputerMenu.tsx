import './ComputerMenu.css';

interface ComputerDifficulty {
  onSelectDifficulty: (difficulty: 'easy' | 'hard') => void;
}

const ComputerMenu: React.FC<ComputerDifficulty> = ({onSelectDifficulty}) => {
  return (
    <section className="computer-menu">
      <h3>Select Difficulty</h3>
      <button className="button" onClick={() => onSelectDifficulty('easy')}>Easy</button>
      <button className="button" onClick={() => onSelectDifficulty('hard')}>Hard</button>
    </section>
  )
}

export default ComputerMenu;