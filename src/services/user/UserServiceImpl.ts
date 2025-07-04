// src/services/user/UserServiceImpl.ts
import { UserRepository } from '../../data/interfaces/UserRepository';
import { UserService } from '../interfaces/UserService';

export class UserServiceImpl implements UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number) {
    return await this.userRepository.findUserById(id);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async registerUser(email: string, name: string, passwordHash: string) {
    return await this.userRepository.createUser({ email, name, passwordHash });
  }

  async updateUser(id: number, updates: Partial<{ name: string; email: string; passwordHash: string }>) {
    return await this.userRepository.updateUser(id, updates);
  }

  async deleteUser(id: number) {
    return await this.userRepository.deleteUser(id);
  }
}
