import { Component } from '@angular/core';
import { AccountService } from './services';
import { Account } from './models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  account: Account;

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe(
      (account) => (this.account = account)
    );
  }

  get isLogged() {
    return this.accountService.isLogged;
  }

  get cssClass() {
    return this.isLogged ? '' : 'no-logged';
  }
}
