import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@frontend/auth';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: this.usernameControl,
      password: this.passwordControl,
    });
  }

  login(): void {
    this.authService
      .signIn(this.usernameControl.value, this.passwordControl.value)
      .then(() => this.router.navigate(['/dashboard']));
  }
}
