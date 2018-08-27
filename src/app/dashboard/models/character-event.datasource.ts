import { DataSource } from "@angular/cdk/table";
import { Observable } from "rxjs";
import { CharacterEvent } from "./character-event.interface";

export class CharacterEventDataSource extends DataSource<CharacterEvent> {
    
    constructor(private characterEvents: CharacterEvent[]) {
        super();
    }

    connect(): Observable<CharacterEvent[]> {
        return Observable.of(this.characterEvents);
      }
    
    disconnect() {}
}