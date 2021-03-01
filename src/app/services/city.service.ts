import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models';

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

  getCityByName(name: string) {}
}
