export interface UserService {
  getUserById(id: number): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  registerUser(email: string, name: string, passwordHash: string): Promise<any>;
  updateUser(id: number, updates: Partial<{ name: string; email: string; passwordHash: string }>): Promise<any>;
  deleteUser(id: number): Promise<any>;
}