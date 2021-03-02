import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { City } from 'src/app/models';
import { User } from 'src/app/models/user.model';
import { AlertService, CityService, UserService } from 'src/app/services';

@Component({
  templateUrl: 'users.component.html',
})
export class UsersComponent implements OnInit {
  users: User[];
  cities: City[];
  form: FormGroup;
  submitted = false;
  citySearch = false;
  search: { sede: number; users: User[] }[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private cityService: CityService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      city: ['', Validators.required],
    });
    this.userService.allUsers().subscribe((users) => (this.users = users));
    this.cityService.getCities().subscribe((cities) => (this.cities = cities));
  }

  get firstCity() {
    return this.cities.length ? this.cities[0] : new City();
  }

  getDate(date: string) {
    return moment(date).format('DD-MM-YYYY HH:MM');
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (!this.form.valid) return;
    this.userService.allUsersByCityId(this.f.city.value).subscribe((x) => {
      this.citySearch = true;
      this.search = x;
    });
  }
}
