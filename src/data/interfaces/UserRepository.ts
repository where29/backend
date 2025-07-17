// src/data/interfaces/UserRepository.ts
import { User } from '../../domain/entities/User';

export interface UserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(user: { name: string; email: string; passwordHash: string }): Promise<User>;
  findUserById(id: number): Promise<User | null>;
  updateUser(id: number, updates: Partial<{ name: string; email: string; passwordHash: string }>): Promise<User | null>;
  deleteUser(id: number): Promise<void>;
}
