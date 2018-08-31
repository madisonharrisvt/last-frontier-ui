import { DataSource } from "@angular/cdk/table";
import { Observable, of } from 'rxjs';
import { CharacterEvent } from "./character-event.interface";

export class CharacterEventDataSource extends DataSource<CharacterEvent> {
    
    constructor(private characterEvents: CharacterEvent[]) {
        super();
    }

    connect(): Observable<CharacterEvent[]> {
        return of(this.characterEvents);
      }
    
    disconnect() {}
}