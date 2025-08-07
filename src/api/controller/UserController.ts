// src/api/controller/UserController.ts
import { Request, Response } from 'express';
import { UserService } from '../../services/interfaces/UserService';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getProfile(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await this.userService.getUserById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Return user data without password hash
    const userProfile = {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName()
    };

    res.status(200).json(userProfile);
  }

  async searchByEmail(req: Request, res: Response) {
    try {
      const { email } = req.query;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Email parameter is required' });
      }

      const user = await this.userService.getUserByEmail(email);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return user data without password hash
      const userProfile = {
        id: user.getId(),
        email: user.getEmail(),
        name: user.getName()
      };

      res.status(200).json(userProfile);
    } catch (error) {
      console.error('Error searching user by email:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
