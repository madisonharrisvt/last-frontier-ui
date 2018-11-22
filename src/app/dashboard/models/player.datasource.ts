import { DataSource } from "@angular/cdk/table";
import { Observable, of } from 'rxjs';
import { Player } from "./player.interface";

export class PlayerDataSource extends DataSource<Player> {
    
    constructor(private players: Player[]) {
        super();
    }

    connect(): Observable<Player[]> {
        return of(this.players);
      }
    
    disconnect() {}
}