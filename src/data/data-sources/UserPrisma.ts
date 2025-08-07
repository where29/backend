import { PrismaClient, Prisma } from '@prisma/client';
import { UserRepository } from '../interfaces/UserRepository';
import { User } from '../../domain/entities/User';

export class EmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.name = 'EmailAlreadyExistsError';
  }
}

export class UserPrisma implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.id, user.email, user.name, user.password);
  }

  async createUser(userData: { name: string; email: string; passwordHash: string }): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: userData.passwordHash,
        },
      });
      return new User(user.id, user.email, user.name, user.password);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 is the error code for unique constraint violations
        if (error.code === 'P2002') {
          const target = error.meta?.target;
          if (Array.isArray(target) && target.includes('email')) {
            throw new EmailAlreadyExistsError(userData.email);
          }
          // If target is not an array or doesn't specify, but it's a unique constraint error,
          // and we're dealing with user email, it's likely the email constraint
          if (error.message.includes('User_email_key')) {
            throw new EmailAlreadyExistsError(userData.email);
          }
        }
      }
      throw error;
    }
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
