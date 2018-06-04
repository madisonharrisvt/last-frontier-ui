import { Metadata } from '../models/metadata.interface';
export class CharacterMetadata {
    occupations: Array<Metadata>;
    sideGigs: Array<Metadata>;
    skills: Array<Metadata>;
    species: Array<Metadata>;
    statuses: Array<Metadata>;
    stressResponses: Array<Metadata>;
}