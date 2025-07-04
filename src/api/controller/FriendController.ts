// src/api/controller/FriendController.ts
import { Request, Response } from 'express';
import { FriendService } from '../../services/interfaces/FriendService';

export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  async followUser(req: Request, res: Response) {
    const followerId = req.user?.id;
    const { followedId } = req.body;
    if (!followerId || !followedId) return res.status(400).json({ message: 'Missing data' });

    await this.friendService.followUser(followerId, followedId);
    res.status(200).json({ message: 'Followed successfully' });
  }

  async addFriend(req: Request, res: Response) {
    const userId = req.user?.id;
    const { friendId } = req.body;
    if (!userId || !friendId) return res.status(400).json({ message: 'Missing data' });

    await this.friendService.addFriend(userId, friendId);
    res.status(200).json({ message: 'Friend added successfully' });
  }

  async getFollowers(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    const followers = await this.friendService.getFollowers(userId);
    res.status(200).json(followers);
  }

  async getFollowing(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    const following = await this.friendService.getFollowing(userId);
    res.status(200).json(following);
  }

  async getFriends(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    const friends = await this.friendService.getFriends(userId);
    res.status(200).json(friends);
  }
}
