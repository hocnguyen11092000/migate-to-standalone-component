export class Users {
  private users: User[] = [];

  set addUser(user: User) {
    this.users.push(user);
  }

  get user(): User[] {
    return this.users;
  }
}

export class User {
  userName: string = '';
  password: string = '';
}
