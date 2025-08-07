// src/api/controller/AuthController.ts
import { Request, Response } from 'express';
import { AuthService } from '../../services/interfaces/AuthService';
import { EmailAlreadyExistsError } from '../../data/data-sources/UserPrisma';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;
      const result = await this.authService.register(name, email, password);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        res.status(409).json({ 
          message: 'Email already exists', 
          error: 'A user with this email address already exists. Please use a different email or sign in with your existing account.' 
        });
        return;
      }
      
      // Log the error for debugging
      console.error('Registration error:', error);
      res.status(500).json({ 
        message: 'Internal server error', 
        error: 'An unexpected error occurred during registration' 
      });
    }
  }

  async signIn(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const tokens = await this.authService.login(email, password);
      if (!tokens) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      res.status(200).json(tokens);
    } catch (error) {
      console.error('Sign in error:', error);
      res.status(500).json({ 
        message: 'Internal server error', 
        error: 'An unexpected error occurred during sign in' 
      });
    }
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
