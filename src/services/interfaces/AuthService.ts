export interface AuthService {
  login(email: string, password: string): Promise<{ token: string } | null>;
  register(name: string, email: string, password: string): Promise<{ token: string }>;
  hashPassword(password: string): Promise<string>;
  comparePasswords(password: string, hashed: string): Promise<boolean>;
}