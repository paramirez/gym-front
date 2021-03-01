import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { City } from 'src/app/models/city.model';
import { Sede } from 'src/app/models/sede.model';
import {
  AccountService,
  AlertService,
  CityService,
  SedeService,
  UserService,
} from 'src/app/services';
import { RegisterValidator } from './register.validators';

@Component({
  templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {
  private cities: City[];
  sedes: Sede[];
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private sedeService: SedeService,
    private cityService: CityService,
    private accountService: AccountService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    if (this.accountService.isLogged) return this.redirect();
    this.cityService.getCities().subscribe((x) => (this.cities = x));
    this.sedeService.getSedes().subscribe((x) => {
      this.sedes = x;
      console.log(this.sedes);
    });
    this.form = this.formBuilder.group({
      sede: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.minLength(8),
          Validators.required,
          RegisterValidator.passwordValidator,
        ],
      ],
    });
  }

  get f() {
    return this.form.controls;
  }

  redirect(path: string = '/') {
    this.router.navigateByUrl(path);
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    console.log(this.form);
    if (this.form.invalid) return;

    this.loading = true;

    this.userService
      .createUser(this.f.sede.value, {
        email: this.f.email.value,
        password: this.f.password.value,
      })
      .pipe(first())
      .subscribe({
        next: (access) => {
          this.loading = false;
          if (!access) return this.alertService.error('Unable to access');
          this.alertService.success('User created!', { autoClose: false });
          this.redirect();
        },
        error: (err) => {
          if (err.status === 400 && err.error && err.error.error)
            this.alertService.error(err.error.error, { autoClose: false });
          this.loading = false;
        },
      });
  }
}
