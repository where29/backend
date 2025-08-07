// src/services/auth/AuthServiceImpl.ts
import { AuthService } from '../interfaces/AuthService';
import { UserRepository } from '../../data/interfaces/UserRepository';
import { User } from '../../domain/entities/User';
import { EmailAlreadyExistsError } from '../../data/data-sources/UserPrisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-jwt-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-default-refresh-token-secret';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '30d';

export class AuthServiceImpl implements AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string } | null> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user || !(await this.comparePasswords(password, user.getPasswordHash()))) {
      return null;
    }
    const accessToken = this.generateAccessToken(user.getId(), user.getEmail());
    const refreshToken = this.generateRefreshToken(user.getId(), user.getEmail());
    return { accessToken, refreshToken };
  }

  async register(name: string, email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const passwordHash = await this.hashPassword(password);
      const user = await this.userRepository.createUser({ name, email, passwordHash });
      const accessToken = this.generateAccessToken(user.getId(), user.getEmail());
      const refreshToken = this.generateRefreshToken(user.getId(), user.getEmail());
      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        throw error; // Re-throw to be handled by the controller
      }
      throw error;
    }
  }

  generateAccessToken(userId: number, email: string): string {
    return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
  }

  generateRefreshToken(userId: number, email: string): string {
    return jwt.sign({ userId, email }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }

  async verifyRefreshToken(token: string): Promise<{ userId: number; email: string }> {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: number; email: string };
  }

  private refreshTokens: Set<string> = new Set(); // use a DB in production

async refresh(token: string): Promise<{ accessToken: string; refreshToken: string }> {
  if (!this.refreshTokens.has(token)) throw new Error('Invalid token');
  const payload = await this.verifyRefreshToken(token);
  const accessToken = this.generateAccessToken(payload.userId, payload.email);
  const refreshToken = this.generateRefreshToken(payload.userId, payload.email);

  this.refreshTokens.delete(token);
  this.refreshTokens.add(refreshToken);

  return { accessToken, refreshToken };
}

async revoke(token: string): Promise<void> {
  this.refreshTokens.delete(token);
}
}
