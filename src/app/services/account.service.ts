import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

export const localStorageUserKeys = {
  user: 'prubauser',
  userexp: 'prubauser_exp',
};

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    const token = localStorage.getItem(localStorageUserKeys.user);
    const udecode = this.decodeToken(token);
    this.userSubject = new BehaviorSubject<User>(
      new User({ ...udecode, token })
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  logout() {
    localStorage.removeItem(localStorageUserKeys.user);
    localStorage.removeItem(localStorageUserKeys.userexp);
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  login(email: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`${environment.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((res) => {
          if (!res.access_token) return false;
          const { access_token } = res;
          const udecode = this.decodeToken(access_token);

          localStorage.setItem(localStorageUserKeys.user, btoa(access_token));
          localStorage.setItem(
            localStorageUserKeys.userexp,
            JSON.stringify(moment().add(udecode.exp, 'second').valueOf())
          );
          this.setSession(udecode, access_token);
          return true;
        })
      );
  }

  private decodeToken(token) {
    return token ? JSON.parse(atob(atob(token).split('.')[1])) : {};
  }

  private setSession(udecode: Partial<User>, token: string) {
    this.userSubject.next(new User({ ...udecode, token }));
  }

  getExpiration() {
    const expiration = localStorage.getItem(localStorageUserKeys.userexp);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public get isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public get isLogged() {
    return this.isLoggedIn && this.userValue.sub;
  }

  public get isLoggedOut() {
    return !this.isLoggedIn;
  }
}
