import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-root',
  templateUrl: './dashboard-root.component.html',
  styleUrls: ['./dashboard-root.component.css']
})
export class DashboardRootComponent implements OnInit {

  events = [];
  roles: string[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private userService: UserService, private router: Router, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    let token = localStorage.getItem('auth_token');
    let payload = decode(token);
    this.roles = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
