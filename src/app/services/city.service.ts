import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City, CityResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class CityService {
  private citiesSubject: BehaviorSubject<City[]>;
  private cities: Observable<City[]>;

  constructor(private http: HttpClient) {
    this.citiesSubject = new BehaviorSubject<City[]>([new City()]);
    this.cities = this.citiesSubject.asObservable();
  }

  getCities() {
    return this.http.get<City[]>(`${environment.apiUrl}/cities`).pipe();
  }

  getCitiesWithSedes() {
    return this.http
      .get<City[]>(`${environment.apiUrl}/cities/withsedes`)
      .pipe();
  }

  getAdminCities() {
    return this.http
      .get<CityResponse[]>(`${environment.apiUrl}/cities/all`)
      .pipe();
  }

  getCityByName(name: string) {}

  create(name: string) {
    return this.http
      .post<City>(`${environment.apiUrl}/cities`, { name })
      .pipe();
  }
}
