import { Skill } from './skill.interface';

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
    torsoHealth: number;
    rightArmHealth: number;
    leftArmHealth: number;
    rightLegHealth: number;
    leftLegHealth: number;
}