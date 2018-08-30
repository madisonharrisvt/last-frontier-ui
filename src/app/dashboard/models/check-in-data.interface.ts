import { AddPlayerDialogData } from "./add-player.interface";
import { Character } from "./character.interface";
import { LFEvent } from "./event.interface";

export class CheckInData {
    newPlayerEmail: string;
    newCharacter: Character;
    event: LFEvent;
}