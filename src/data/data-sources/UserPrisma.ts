import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../interfaces/UserRepository';
import { User } from '../../domain/entities/User';

export class UserPrisma implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.id, user.email, user.name, user.password);
  }

  async createUser(userData: { name: string; email: string; passwordHash: string }): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.passwordHash,
      },
    });
    return new User(user.id, user.email, user.name, user.password);
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(user.id, user.email, user.name, user.password);
  }

  async updateUser(id: number, updates: Partial<{ name: string; email: string; passwordHash: string }>): Promise<User | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updates,
    });
    return new User(user.id, user.email, user.name, user.password);
  }

  async deleteUser(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
