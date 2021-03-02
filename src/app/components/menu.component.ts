import { Component } from '@angular/core';
import { Account } from '../models';
import { AccountService } from '../services';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
})
export class MenuComponent {
  account: Account;

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe(
      (account) => (this.account = account)
    );
  }

  get isLogged() {
    return this.accountService.isLogged;
  }

  logout() {
    this.accountService.logout();
  }

  get name() {
    return this.account.name || 'Sin especificar';
  }

  get isAdmin() {
    return this.account.roles.includes('ADMIN');
  }
}
