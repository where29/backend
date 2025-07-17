export interface AuthService {
  login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string } | null>;
  register(name: string, email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;
  verifyRefreshToken(token: string): Promise<{ userId: number; email: string }>;
  refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }>;
  revoke(refreshToken: string): Promise<void>;
}