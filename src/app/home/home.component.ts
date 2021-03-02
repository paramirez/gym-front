import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models';
import { User } from '../models/user.model';
import { AccountService, AlertService, UserService } from '../services';
import { RegisterValidator } from '../account/components/register.validators';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  account: Account;
  user: User = new User();
  form: FormGroup;
  isForm = false;
  isFormName = false;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.account = this.accountService.accountValue;
    this.userService
      .byId(this.account.sub)
      .subscribe((x) => (this.user = x.user));
    this.form = this.fb.group({
      password: [
        '',
        [
          Validators.minLength(8),
          Validators.required,
          RegisterValidator.passwordValidator,
        ],
      ],
      name: [this.user.name, [Validators.minLength(3), Validators.required]],
    });
  }

  changePassword() {
    this.isForm = !this.isForm;
    if (this.isForm) this.isFormName = false;
  }

  changeName() {
    this.isFormName = !this.isFormName;
    if (this.isFormName) this.isForm = false;
  }

  get f() {
    return this.form.controls;
  }

  EnterSubmit(event, field: string) {
    if (event.keyCode === 13) this.onSubmit(field);
  }

  cancel() {
    this.form.controls.password.reset('');
    this.form.controls.name.reset('');
    this.isForm = false;
    this.isFormName = false;
  }

  onSubmit(field: string) {
    this.submitted = true;
    this.alertService.clear();

    if (this.f[field].errors) return;

    this.loading = true;
    this.userService
      .updateUser(this.account.sub, { [field]: this.f[field].value })
      .subscribe({
        next: (updated) => {
          console.log(updated);
          this.loading = false;
          this.cancel();
          return this.alertService.success(
            'Updated, please restart session for view changes',
            { autoClose: false }
          );
        },
        error: (err) => {
          if (err.status === 400 && err.error && err.error.error)
            this.alertService.warning(err.error.error, { autoClose: false });
          this.loading = false;
        },
      });

    // this.accountService
    //   .login(this.f.email.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe({
  }
}
