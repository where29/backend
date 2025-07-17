// src/services/follow/FollowServiceImpl.ts
import { FollowRepository } from '../../data/interfaces/FollowRepository';
import { FollowService } from '../interfaces/FollowService';
import { Follow } from '../../domain/entities/Follow';
import { FollowStatus } from '../../domain/entities/FollowStatus';

export class FollowServiceImpl implements FollowService {
  constructor(private readonly followRepository: FollowRepository) {}

  async followUser(followerId: number, followingId: number): Promise<Follow> {
    return await this.followRepository.followUser(followerId, followingId);
  }

  async addFriend(userId: number, friendId: number): Promise<Follow> {
    return await this.followRepository.addFriend(userId, friendId);
  }

  async getFollowers(userId: number): Promise<Follow[]> {
    return await this.followRepository.getFollowers(userId);
  }

  async getFollowing(userId: number): Promise<Follow[]> {
    return await this.followRepository.getFollowing(userId);
  }

  async updateFollowStatus(
    followerId: number,
    followingId: number,
    status: FollowStatus
  ): Promise<Follow> {
    return await this.followRepository.updateFollowStatus(followerId, followingId, status);
  }
}
