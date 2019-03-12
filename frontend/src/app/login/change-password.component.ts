import {Component} from '@angular/core';
import {
  Validators,
  FormBuilder,
  ValidatorFn,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import {UserService} from '../shared/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

const sameValueValidator: ValidatorFn = (
  group: FormGroup,
): ValidationErrors | null => {
  const passwordValue = group.get('password').value;
  const repeatPasswordValue = group.get('repeatPassword').value;

  return passwordValue === repeatPasswordValue
    ? null
    : {passwordDoesNotMatch: true};
};

@Component({
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  passwordFormGroup = this.formBuilder.group(
    {
      email: [''],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(4)]],
    },
    {validator: sameValueValidator},
  );

  text = '';
  errorText = '';

  private codeObs: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    this.codeObs = activatedRoute.params.map(params => params['code'] || '');
    this.userService
      .getEmail()
      .subscribe(email => this.passwordFormGroup.get('email').setValue(email));
  }

  onPasswordChange() {
    this.text = '';
    this.errorText = '';
    const newPassword = this.passwordFormGroup.get('password').value;

    this.codeObs
      .flatMap(
        code =>
          code
            ? this.userService.changePassword(newPassword, code)
            : this.userService.changePasswordAuth(newPassword),
      )
      .subscribe(
        () => (this.text = 'Password changed successfully'),
        err => (this.errorText = err),
      );
  }
}
