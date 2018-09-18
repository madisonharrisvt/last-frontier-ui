import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:email/:token', component: PasswordResetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
