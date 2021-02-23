import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Login } from '@frontend/auth';
import { Store } from '@ngxs/store';

@Component({
  selector: 'frontend-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginInvalid: boolean;
  public loginForm: FormGroup;
  public usernameControl: FormControl = new FormControl('', [
    Validators.required,
  ]);
  public passwordControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private store: Store, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: this.usernameControl,
      password: this.passwordControl,
    });
  }

  login(): void {
    this.store.dispatch(
      new Login(this.usernameControl.value, this.passwordControl.value)
    );
  }
}
