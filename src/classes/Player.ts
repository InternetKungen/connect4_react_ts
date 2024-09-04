// src/classes/Player.ts
//Represents a player in the game.
export default class Player {
  name: string;
  color: 'X' | 'O';
  isComputer: boolean;


  constructor(name: string, color: 'X' | 'O', isComputer: boolean = false) {
    this.name = name;
    this.color = color;
    this.isComputer = isComputer;
  }

}
