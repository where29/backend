import { Request, Response } from 'express';
import { AuthService } from '../../services/interfaces/AuthService';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signUp(req: Request, res: Response) {
    const { email, password, name } = req.body;
    const result = await this.authService.register(name, email, password);
    res.status(201).json(result);
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this.authService.login(email, password);
    if (!result) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json(result);
  }
}