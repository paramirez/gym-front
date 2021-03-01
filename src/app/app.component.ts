import { Component } from '@angular/core';
import { User } from './models';
import { AccountService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((user) => (this.user = user));
  }

  get isLogged() {
    return this.accountService.isLogged;
  }

  logout() {
    this.accountService.logout();
  }
}
