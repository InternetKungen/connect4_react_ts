interface ComputerDifficulty {
  onSelectDifficulty: (difficulty: 'easy' | 'hard') => void;
}

const ComputerMenu: React.FC<ComputerDifficulty> = ({onSelectDifficulty}) => {
  return (
    <div>
      <h3>Select Difficulty</h3>
      <button onClick={() => onSelectDifficulty('easy')}>Easy</button>
      <button onClick={() => onSelectDifficulty('hard')}>Hard</button>
    </div>
  )
}

export default ComputerMenu;