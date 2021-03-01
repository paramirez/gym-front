export class Account {
  token: string;
  email: string;
  exp: number;
  iat: number;
  name: string;
  roles: string[];
  sub: number;

  constructor(user?: Partial<Account>) {
    Object.assign(this, user);
  }
}
