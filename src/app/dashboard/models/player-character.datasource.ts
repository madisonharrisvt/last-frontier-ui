import { DataSource } from "@angular/cdk/table";
import { Observable, of } from "rxjs";
import { PlayerCharacter } from "./player-character.interface";

export class PlayerCharacterDataSource extends DataSource<PlayerCharacter> {
    
    constructor(private playerCharacters: PlayerCharacter[]) {
        super();
    }

    connect(): Observable<PlayerCharacter[]> {
        return of(this.playerCharacters);
      }
    
    disconnect() {}
}