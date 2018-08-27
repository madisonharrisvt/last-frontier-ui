import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatTab } from '../../../../../node_modules/@angular/material';
import { CharacterEventService } from '../../services/character-event.service';
import { PlayerCharacter } from '../../models/player-character.interface';
import { LFEvent } from '../../models/event.interface';

@Component({
  selector: 'app-add-character-to-event-dialog',
  templateUrl: './add-character-to-event-dialog.component.html',
  styleUrls: ['./add-character-to-event-dialog.component.css']
})
export class AddCharacterToEventDialogComponent implements OnInit {

  filterDataSource = null;
  displayedColumns = ['playerId', 'firstName', 'lastName', 'characterName', 'actions'];

  constructor(
    private characterEventService: CharacterEventService,
    public dialogRef: MatDialogRef<AddCharacterToEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LFEvent
  ) { }

  ngOnInit() {
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.characterEventService.getAllCharacters()
      .subscribe(allCharacters => {
        this.filterDataSource = new MatTableDataSource(allCharacters);
      });
  }

  applyFilter(filterValue: string) {
    this.filterDataSource.filter = filterValue.trim().toLowerCase();
  }

  add(playerCharacter: PlayerCharacter): void {
    this.characterEventService.addCharacterToEvent(playerCharacter, this.data.id).subscribe();
    this.dialogRef.close();
  }
}
