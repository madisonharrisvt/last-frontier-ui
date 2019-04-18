import { HackingPuzzleRow } from "./hacking-puzzle-row";

export class HackingPuzzle {
    id: number;
    flag: string;
    password: string;
    attempts: number;
    attemptsRemaining: number;
    rows: Array<HackingPuzzleRow>;
}