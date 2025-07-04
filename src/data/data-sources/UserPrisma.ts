// src/data/data-sources/UserDataSourcePrisma.ts
import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../interfaces/UserRepository';

const prisma = new PrismaClient();

export class UserDataSourcePrisma implements UserRepository {
  async findUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: { email: string; name: string; passwordHash: string }) {
    return await prisma.user.create({
      data,
    });
  }

  async updateUser(id: number, updates: Partial<{ name: string; email: string; passwordHash: string }>) {
    return await prisma.user.update({
      where: { id },
      data: updates,
    });
  }

  async deleteUser(id: number) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
