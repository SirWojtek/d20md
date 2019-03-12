import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {ReCaptchaModule} from 'angular2-recaptcha';
import {ResetPasswordComponent} from './reset-password.component';
import {ChangePasswordComponent} from './change-password.component';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'change-password/:code',
    component: ChangePasswordComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ReCaptchaModule,
    SharedModule,
    RouterModule.forChild(loginRoutes),
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
  ],
})
export class LoginModule {}
