export class User {
  id: number;
  name: string;
  email: string;
  role: string[] = ['NORMAL'];
  status: boolean;
  createdAt: string;

  constructor(initial?: Partial<User>) {
    Object.assign(this, initial);
  }
}

export class CreateUser extends User {
  password: string;
  constructor(initial?: Partial<CreateUser>) {
    super(initial);
    Object.assign(this, initial);
  }
}
