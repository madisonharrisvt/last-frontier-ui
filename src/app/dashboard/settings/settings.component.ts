import { Component, OnInit } from '@angular/core';
import * as decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { CheckOutService } from '../services/check-out.service';
import { Token } from '../models/token.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  stripe_key = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // todo: get production key when publishing
  worked = false;
  email = '';
  ForgotPasswordForm: FormGroup;

  constructor(
    private userService: UserService,
    private checkOutService: CheckOutService,
    
    ) { }

  ngOnInit() {
    let token = localStorage.getItem('auth_token');
    let payload = decode(token);
    this.email = payload["sub"];

    this.ForgotPasswordForm = new FormGroup ({
      email: new FormControl( {
        value: this.email, 
        disabled: true
      }, {
        validators: [Validators.required]
      })
    });
  }

  resetPassword() {
    this.userService.requestPasswordReset(this.email).subscribe();
  }

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: this.stripe_key,
      billingAddress: true,
      locale: 'auto',
      token: token => {
        var model = new Token();
        model.id = token.id;
        this.checkOutService.checkOut(model)
          .subscribe(() => this.worked = true);
      }
    });

    handler.open({
      name: 'Last Frontier',
      description: 'Game {#} Checkout', // todo: add actual event number here
      amount: 2000
    });

  }
}