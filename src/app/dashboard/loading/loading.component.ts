import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  isLoading: boolean = false;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.currentLoadingState.subscribe(isLoading => this.isLoading = isLoading);
  }

}
