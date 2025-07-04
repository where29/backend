export interface UserRepository {
  findUserById(id: number): Promise<any>;
  findUserByEmail(email: string): Promise<any>;
  createUser(data: { email: string; name: string; passwordHash: string }): Promise<any>;
  updateUser(id: number, updates: Partial<{ name: string; email: string; passwordHash: string }>): Promise<any>;
  deleteUser(id: number): Promise<any>;
}
