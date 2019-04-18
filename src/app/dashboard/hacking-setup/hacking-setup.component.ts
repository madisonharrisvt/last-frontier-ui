import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HackingSetupService } from '../services/hacking-setup.service';
import { HackingPuzzleRow } from '../models/hacking-puzzle-row';
import { HackingPuzzle } from '../models/hacking-puzzle';

@Component({
  selector: 'app-hacking-setup',
  templateUrl: './hacking-setup.component.html',
  styleUrls: ['./hacking-setup.component.css']
})
export class HackingSetupComponent implements OnInit {

  setupForm: FormGroup;
  options: Array<string>;
  result: boolean;
  requestFailure: boolean = false;
  errors: string = '';
  isLoading: boolean = false;
  success: boolean = false;

  constructor( private hackingSetupService: HackingSetupService ) { }

  ngOnInit() {
    this.setupForm = new FormGroup( {
      password: new FormControl('', {
        validators: [Validators.required]
      }),
      attempts: new FormControl('', {
        validators: [Validators.required]
      }),
      flag: new FormControl('', {
        validators: [Validators.required]
      }),
      answer: new FormControl('', { 
        validators: [Validators.required]
      }),
      option: new FormControl()
    });

    this.options = [];
  }

  add() {
    var option = this.setupForm.controls.option.value;
    var strOption = String(option);
    strOption = strOption.toLowerCase();
    strOption = strOption.trim();
    this.options.push(strOption);
    this.setupForm.controls.option.setValue('');
  }

  remove(option: string) {
    var filteredOptions = this.options.filter(o => o != option);
    this.options = filteredOptions;
  }

  generatePuzzle() {
    this.isLoading = true;
    this.requestFailure = false;
    this.errors = '';

    var hackingPuzzle = new HackingPuzzle();
    hackingPuzzle.flag = this.setupForm.value.flag;
    hackingPuzzle.password = this.setupForm.value.password;
    hackingPuzzle.attempts = this.setupForm.value.attempts;
    hackingPuzzle.rows = new Array<HackingPuzzleRow>();
    
    this.options.forEach(option => {
      var hackingPuzzleRow = new HackingPuzzleRow();
      hackingPuzzleRow.isAnswer = false;
      hackingPuzzleRow.word = option

      hackingPuzzle.rows.push(hackingPuzzleRow);
    });

    var hackingPuzzleRowAnswer = new HackingPuzzleRow();
    hackingPuzzleRowAnswer.isAnswer = true;
    hackingPuzzleRowAnswer.word = this.setupForm.value.answer;
    hackingPuzzle.rows.push(hackingPuzzleRowAnswer);

    this.hackingSetupService.createHackingPuzzle(hackingPuzzle)
      .subscribe(
        result => { 
          this.isLoading = false;
          this.result = result;
          this.success = true;
        },
        error => {
          this.requestFailure = true;
          this.errors = error;
          this.isLoading = false;
        });
  }

}
