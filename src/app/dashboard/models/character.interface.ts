import { Skill } from './skill.interface';
import { CharacterEvent } from './character-event.interface';

export class Character {
    id: number;
    playerId: number;
    name: string;
    accumulatedXP: number;
    availableXP: number;
    species: number;
    stressResponse: number;
    hStatus: string;
    cloneStatus: boolean;
    occupation: number;
    sideGig: number;
    status: number;
    skills: Skill[];
    events: CharacterEvent[];
    torsoHealth: number;
    rightArmHealth: number;
    leftArmHealth: number;
    rightLegHealth: number;
    leftLegHealth: number;
    culture: number;
}