import { Character } from "./character.interface";
import { LFEvent } from "./event.interface";

export class CharacterEvent {
    id: number;
    characterId: number;
    character: Character;
    eventId: number;
    event: LFEvent;
    vpToXp: number;
    vpToItems: number;
    xpBought: number;
}