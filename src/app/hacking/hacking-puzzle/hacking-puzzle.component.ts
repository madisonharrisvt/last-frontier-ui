import { Component, OnInit } from '@angular/core';
import { PuzzleService } from '../../shared/services/puzzle.service';
import { HackingPuzzle } from '../../dashboard/models/hacking-puzzle';

@Component({
  selector: 'app-hacking-puzzle',
  templateUrl: './hacking-puzzle.component.html',
  styleUrls: ['./hacking-puzzle.component.css']
})
export class HackingPuzzleComponent implements OnInit {

  codes: Array<string> = null;
  requestFailure: boolean = false;
  errors: string = '';

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit() {
    this.puzzleService.getHackingPuzzle()
      .subscribe( 
      codes => {
        var codeList = new Array<string>();
        Object.keys(codes).forEach(key => codeList.push(codes[key]));
        this.codes = codeList;
        
      },
      error => {
        this.requestFailure = true;
        this.errors = error;
      });
  }

}
