// src/domain/entities/User.ts
export class User {
  constructor(
    private readonly id: number,
    private readonly email: string,
    private readonly name: string,
    private readonly passwordHash: string
  ) {}

  getId(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }
}
