import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/services';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    if (this.accountService.isLogged) return this.redirect();
    this.form = this.fromBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) return;

    this.loading = true;

    this.accountService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: (access) => {
          this.loading = false;
          if (!access)
            return this.alertService.error(
              'No es posible acceder en el momento'
            );
          this.redirect();
        },
        error: (err) => {
          if (err.status === 400 && err.error && err.error.error)
            this.alertService.error(err.error.error);
          this.loading = false;
        },
      });
  }

  redirect() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigateByUrl(returnUrl);
  }
}
