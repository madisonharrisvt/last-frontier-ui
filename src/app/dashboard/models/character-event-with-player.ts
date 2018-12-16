import { Player } from "./player.interface";
import { CharacterEvent } from "./character-event.interface";

export class CharacterEventWithPlayer {
    characterEvent: CharacterEvent;
    player: Player;
}