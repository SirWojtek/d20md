import {Component} from '@angular/core';
import {FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {environment} from '../../environments/environment';
import {UserService} from '../shared/user/user.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  disableRecaptcha = environment.disableRecaptcha;

  registerForm = this.formBuilder.group(
    {
      email: [null, Validators.email],
      password: [null, [Validators.required, Validators.minLength(4)]],
      repeatPassword: [null, [Validators.required, Validators.minLength(4)]],
    },
    {validator: this.passwordCheck},
  );

  recaptcha: string = null;

  public created = false;
  public error = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {}

  onRegister() {
    const [email, password] = [
      this.registerForm.get('email').value,
      this.registerForm.get('password').value,
    ];
    this.created = false;
    this.error = null;

    this.userService
      .createAccount(email, password, this.recaptcha)
      .subscribe(
        () => (this.created = true),
        err => (this.error = err.error[0].message),
      );
  }

  private passwordCheck(c: AbstractControl): {invalid: boolean} {
    if (c.get('password').value !== c.get('repeatPassword').value) {
      return {invalid: true};
    }
  }
}
