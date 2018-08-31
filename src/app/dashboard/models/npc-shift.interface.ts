import { LFEvent } from "./event.interface";

export class NpcShift {
    id: number;
    startDateTime: string;
    endDateTime: string;
    eventId: number;
    event: LFEvent;
    npcCount: number;
}