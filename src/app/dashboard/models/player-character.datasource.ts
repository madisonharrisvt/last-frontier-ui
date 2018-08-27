import { DataSource } from "@angular/cdk/table";
import { Observable } from "rxjs";
import { PlayerCharacter } from "./player-character.interface";

export class PlayerCharacterDataSource extends DataSource<PlayerCharacter> {
    
    constructor(private playerCharacters: PlayerCharacter[]) {
        super();
    }

    connect(): Observable<PlayerCharacter[]> {
        return Observable.of(this.playerCharacters);
      }
    
    disconnect() {}
}