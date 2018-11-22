import { Character } from './character.interface';

export class CharacterDropDown {
  controlName: string;
  characterList: Array<Character>;
  selectedCharacter: Character;
  paidXpControlName: string;
  vpToXpControlName: string;
  baseXp: number;
  totalXp: number;
  subTotal: number;
}