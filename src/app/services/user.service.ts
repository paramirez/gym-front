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
          return true;
        })
      );
  }

  allUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe();
  }

  byId(id: number) {
    return this.http
      .get<{ user: User }>(`${environment.apiUrl}/users/${id}`)
      .pipe();
  }

  updateUser(id: number, data?: Partial<User>) {
    return this.http
      .put<number>(`${environment.apiUrl}/users/${id}`, { ...data })
      .pipe();
  }

  allUsersByCityId(id: number) {
    return this.http
      .get<{ sede: number; users: User[] }[]>(
        `${environment.apiUrl}/sedes/users/city/${id}`
      )
      .pipe();
  }
}
