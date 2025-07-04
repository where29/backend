import { AuthService } from '../interfaces/AuthService';
import { UserRepository } from '../../data/interfaces/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-jwt-secret';

export class AuthServiceImpl implements AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string): Promise<{ token: string } | null> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user || !(await this.comparePasswords(password, user.passwordHash))) {
      return null;
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    return { token };
  }

  async register(name: string, email: string, password: string): Promise<{ token: string }> {
    const passwordHash = await this.hashPassword(password);
    const user = await this.userRepository.createUser({ name, email, passwordHash });
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    return { token };
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
}
