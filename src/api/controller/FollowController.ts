// src/api/controller/FollowController.ts
import { Request, Response } from 'express';
import { FollowService } from '../../services/interfaces/FollowService';
import { FollowStatus } from '../../domain/entities/FollowStatus';

export class FollowController {
  constructor(
    private readonly followService: FollowService
  ) {}

  async followUser(req: Request, res: Response) {
    const followerId = req.user?.id;
    const { followedId } = req.body;
    if (!followerId || !followedId) return res.status(400).json({ message: 'Missing data' });

    await this.followService.followUser(followerId, followedId);
    res.status(200).json({ message: 'Followed successfully' });
  }

  async addFriend(req: Request, res: Response) {
    const userId = req.user?.id;
    const { friendId } = req.body;
    if (!userId || !friendId) return res.status(400).json({ message: 'Missing data' });

    await this.followService.updateFollowStatus(userId, friendId, FollowStatus.FRIEND);
    res.status(200).json({ message: 'Friend status updated' });
  }

  async getFollowers(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    const followers = await this.followService.getFollowers(userId);
    res.status(200).json(followers);
  }

  async getFollowing(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    const following = await this.followService.getFollowing(userId);
    res.status(200).json(following);
  }
}
