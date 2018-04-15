import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  events = [];
  role: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    let token = localStorage.getItem('auth_token');
    let payload = decode(token);
    this.role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
