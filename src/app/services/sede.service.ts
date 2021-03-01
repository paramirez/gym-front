import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sede } from '../models';

@Injectable({ providedIn: 'root' })
export class SedeService {
  // private sedesSubject: BehaviorSubject<Sede[]>;
  // private sedes: Observable<Sede[]>;

  constructor(private http: HttpClient) {
    // this.sedesSubject = new BehaviorSubject<Sede[]>([new Sede()]);
    // this.sedes = this.sedesSubject.asObservable();
  }

  getSedes() {
    return this.http.get<Sede[]>(`${environment.apiUrl}/sedes`).pipe();
  }

  getSedeByName(name: string) {}
  getSedeBySedeId(id: number) {}
}
