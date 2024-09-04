import Player from "../classes/Player";

export const handleSetPlayer = (
  name: string,
  color: 'X' | 'O',
  setPlayerX: (player: Player | null) => void,
  setPlayerO: (player: Player | null) => void
) => {
  if (color === 'X') {
    setPlayerX(new Player(name, color));
  } else {
    setPlayerO(new Player(name, color));
  }
};

export const handlePlayerSetupSubmit = (
  e: React.FormEvent,
  setPlayerX: (player: Player | null) => void,
  setPlayerO: (player: Player | null) => void
) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const playerXName = (form.elements.namedItem('playerX') as HTMLInputElement).value;
  const playerOName = (form.elements.namedItem('playerO') as HTMLInputElement).value;
  console.log("Player X Name:", playerXName);
  console.log("Player O Name:", playerOName);
  if (playerXName) handleSetPlayer(playerXName, 'X', setPlayerX, setPlayerO);
  if (playerOName) handleSetPlayer(playerOName, 'O', setPlayerX, setPlayerO);
};

