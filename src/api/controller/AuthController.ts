// src/api/controller/AuthController.ts
import { Request, Response } from 'express';
import { AuthService } from '../../services/interfaces/AuthService';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signUp(req: Request, res: Response): Promise<void> {
    const { email, password, name } = req.body;
    const result = await this.authService.register(name, email, password);
    res.status(201).json(result);
  }

  async signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const tokens = await this.authService.login(email, password);
    if (!tokens) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    res.status(200).json(tokens);
    return;
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;
    try {
      const newTokens = await this.authService.refresh(refreshToken);
      res.status(200).json(newTokens);
    } catch {
      res.status(403).json({ message: 'Invalid refresh token' });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;
    await this.authService.revoke(refreshToken);
    res.status(200).json({ message: 'Logged out successfully' });
  }
}
