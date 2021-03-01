import { Component } from '@angular/core';
import { Account } from '../models';
import { AccountService } from '../services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  account: Account;

  constructor(private accountService: AccountService) {
    this.account = this.accountService.accountValue;
  }
}
