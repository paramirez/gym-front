import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateUser, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(sede: number, user: Partial<CreateUser>) {
    return this.http
      .post<User>(`${environment.apiUrl}/sedes/users/${sede}`, user)
      .pipe(
        map((r) => {
          console.log(r);
          return true;
        })
      );
  }
}
