import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, Sede } from 'src/app/models';
import { AlertService, CityService, SedeService } from 'src/app/services';

@Component({
  templateUrl: 'sedes.component.html',
})
export class SedesComponent implements OnInit {
  form: FormGroup;
  cities: City[];
  sedes: Sede[];
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private sedeService: SedeService,
    private cityService: CityService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe((x) => (this.cities = x));
    this.sedeService.getSedesAdmin().subscribe((x) => (this.sedes = x));
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      city: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (!this.form.valid) return;

    this.sedeService
      .create(
        new Sede({ city: parseInt(this.f.city.value), name: this.f.name.value })
      )
      .subscribe({
        next: (result) => {
          this.loading = false;
          this.submitted = false;
          this.form.controls.city.reset('');
          this.form.controls.name.reset('');
          this.alertService.success('Sede Created!');
          this.sedes = this.sedes.concat(result);
        },
        error: (err) => {
          if (err.status === 400 && err.error && err.error.error)
            this.alertService.warning(err.error.error);
          this.loading = false;
        },
      });
  }
}
