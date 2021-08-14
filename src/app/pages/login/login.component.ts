import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, SelectMultipleControlValueAccessor, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Security } from 'src/app/_utils/security';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: string;
  errors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (Security.getToken()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      login: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = false;
    const result = this.authenticationService.login(this.form.value);
    result
      .subscribe(response => {
        if (response.success === true) {
          this.router.navigate(["/"]);
          Security.set(response);
        } else {
          this.errorMessage = response.message;
          this.loading = false;
        }
      },
        error => {
          this.errors = error;
          this.errorMessage = error.message;
          this.loading = false;
        });
  }
}
