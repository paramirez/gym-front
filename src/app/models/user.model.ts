export class User {
  token: string;
  email: string;
  exp: number;
  iat: number;
  name: string;
  roles: string[];
  sub: number;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
