import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { HackingPuzzleComponent } from './hacking/hacking-puzzle/hacking-puzzle.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent, },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:email/:token', component: PasswordResetComponent },
  { path: 'hacking-puzzle', component: HackingPuzzleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
