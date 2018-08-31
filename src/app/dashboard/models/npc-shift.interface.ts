import { LFEvent } from "./event.interface";
import { Player } from "./player.interface";

export class NpcShift {
    id: number;
    startDateTime: string;
    endDateTime: string;
    eventId: number;
    event: LFEvent;
    npcCount: number;
    players: Player[];
    playerEmails: string;
}