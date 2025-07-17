// src/domain/entities/Follow.ts
import { FollowStatus } from './FollowStatus';

export interface Follow {
  followerId: number;
  followingId: number;
  status: FollowStatus;
  createdAt: Date;
}
