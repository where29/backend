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

    res.status(200).json(user);
  }
}
