import { Follow } from '../../domain/entities/Follow';
import { FollowStatus } from '../../domain/entities/FollowStatus';

export interface FollowService {
  followUser(followerId: number, followingId: number): Promise<Follow>;
  addFriend(userId: number, friendId: number): Promise<Follow>;
  getFollowers(userId: number): Promise<Follow[]>;
  getFollowing(userId: number): Promise<Follow[]>;
  updateFollowStatus(followerId: number, followingId: number, status: FollowStatus): Promise<Follow>;
}
