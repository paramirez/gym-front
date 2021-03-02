import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityResponse } from 'src/app/models';
import { AlertService, CityService } from 'src/app/services';

@Component({
  templateUrl: 'cities.component.html',
})
export class CitiesComponent {
  form: FormGroup;
  cities: CityResponse[];
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.cityService.getAdminCities().subscribe((x) => (this.cities = x));
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (!this.form.valid) return;

    this.cityService.create(this.f.name.value).subscribe({
      next: (result) => {
        this.loading = false;
        this.submitted = false;
        this.cities = this.cities.concat(
          new CityResponse({ name: result.name, id: result.id })
        );
        this.form.controls.name.reset('');
        this.alertService.success('City Created!');
      },
      error: (err) => {
        if (err.status === 400 && err.error && err.error.error)
          this.alertService.warning(err.error.error);
        this.loading = false;
      },
    });
  }
}
