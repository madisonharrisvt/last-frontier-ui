import { Component, OnInit } from '@angular/core';
import { PuzzleService } from '../../shared/services/puzzle.service';
import { HackingPuzzle } from '../../dashboard/models/hacking-puzzle';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-hacking-puzzle',
  templateUrl: './hacking-puzzle.component.html',
  styleUrls: ['./hacking-puzzle.component.css']
})
export class HackingPuzzleComponent implements OnInit {

  codes: Array<string> = null;
  requestFailure: boolean = false;
  errors: string = '';
  attempts: number = 0;
  attemptsRemaining: number = 0;
  passwordForm: FormGroup;
  passwordSuccess: boolean = false;
  hints: Array<string> = new Array<string>();
  flag: string = '';
  isSolved: boolean = false;
  outOfAttempts: boolean = false;

  constructor(private puzzleService: PuzzleService, private snackBar: MatSnackBar) { }

  ngOnInit() {    
    this.passwordForm = new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  submit() {
    var password = this.passwordForm.value.password;

    this.puzzleService.login(password)
      .subscribe(
        codes => {
          this.passwordSuccess = true;

          // populate codes
          var codeList = new Array<string>();
          Object.keys(codes).forEach(key => codeList.push(codes[key]));
          this.codes = codeList;
          
          this.getAttempts();
        },
        error => {
          this.snackBar.open(error, "Done", {
            duration: 2000,
            panelClass: ['failure-snackbar']
          });
        }
      );
  }

  select(code: string) {
    this.puzzleService.submitAnswer(code)
      .subscribe(
        hint => {
          if (hint['Flag'] == null && hint['OutOfAttempts'] == null) {
            this.hints.push(`${hint['NumberCorrect']} / ${hint['WordLength']}`);
            this.getAttempts();
          }
          else if (hint['Flag'] == null && hint['OutOfAttempts'] != null) {
            this.snackBar.open('Out of attempts!  Use one complex action to re-try the puzzle.', "Done", {
              duration: 2000,
              panelClass: ['failure-snackbar']
            });
            this.passwordSuccess = false;
            this.outOfAttempts = true;
          }
          else {
            this.flag = hint['Flag'];
            this.isSolved = true;
          }
        },
        error => {
          this.snackBar.open(error, "Done", {
            duration: 2000,
            panelClass: ['failure-snackbar']
          });
        }
      );
  }

  getAttempts(): void {
    this.puzzleService.getAttempts()
    .subscribe(
      attemptObj => {
        var attempts = attemptObj["Attempts"];
        var attemptsRemaining = attemptObj["AttemptsRemaining"];
        this.attempts = attempts;
        this.attemptsRemaining = attemptsRemaining;

        if (attemptsRemaining == 0) {
          this.passwordSuccess = false;
          this.outOfAttempts = true;
        }
      },
      error => {
        this.snackBar.open(error, "Done", {
          duration: 2000,
          panelClass: ['failure-snackbar']
        });
      }
    );
  }

  resetAttempts() {
    this.puzzleService.resetAttempts()
      .subscribe(
        success => this.outOfAttempts = false
        ,error => {
          this.snackBar.open(error, "Done", {
            duration: 2000,
            panelClass: ['failure-snackbar']
          });
        }
      );
  }
}
