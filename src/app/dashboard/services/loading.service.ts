import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading: boolean = false;
  private loadingSource = new BehaviorSubject(this.isLoading);
  currentLoadingState = this.loadingSource.asObservable();

  constructor() { }

  startLoading() {
    this.loadingSource.next(true);
  }

  endLoading() {
    this.loadingSource.next(false);
  }
}
