import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Account } from '../models';

export const localStorageUserKeys = {
  account: 'prubaaccount',
  accountexp: 'prubaaccount_exp',
};

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  constructor(private router: Router, private http: HttpClient) {
    const token = localStorage.getItem(localStorageUserKeys.account);
    const udecode = this.decodeToken(token);
    this.accountSubject = new BehaviorSubject<Account>(
      new Account({ ...udecode, token: atob(token) })
    );
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  logout() {
    localStorage.removeItem(localStorageUserKeys.account);
    localStorage.removeItem(localStorageUserKeys.accountexp);
    this.accountSubject.next(null);
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
          const udecode = this.decodeToken(btoa(access_token));
          localStorage.setItem(
            localStorageUserKeys.account,
            btoa(access_token)
          );
          localStorage.setItem(
            localStorageUserKeys.accountexp,
            JSON.stringify(moment().add(udecode.exp, 'second').valueOf())
          );
          this.setSession(udecode, access_token);
          return true;
        })
      );
  }

  /**
   * @param token base64 token
   */
  private decodeToken(token: string) {
    const ctoken = token ? (token.includes('.') ? token : atob(token)) : '';
    return ctoken ? JSON.parse(atob(ctoken.split('.')[1])) : {};
  }

  private setSession(udecode: Partial<Account>, token: string) {
    this.accountSubject.next(new Account({ ...udecode, token }));
  }

  getExpiration() {
    const expiration = localStorage.getItem(localStorageUserKeys.accountexp);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public get isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public get isLogged() {
    return this.isLoggedIn && this.accountValue.sub;
  }

  public get isLoggedOut() {
    return !this.isLoggedIn;
  }
}
