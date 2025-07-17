import { PrismaClient, FollowStatus as PrismaFollowStatus } from '@prisma/client';
import { FollowRepository } from '../interfaces/FollowRepository';
import { toDomainFollow } from '../../utils/mappers/toDomainFollow';
import { Follow } from '../../domain/entities/Follow';
import { FollowStatus } from '../../domain/entities/FollowStatus';

export class FollowPrisma implements FollowRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async followUser(followerId: number, followingId: number): Promise<Follow> {
    const result = await this.prisma.follow.create({
      data: {
        followerId,
        followingId,
        status: PrismaFollowStatus.FOLLOWING,
      },
    });
    return toDomainFollow(result);
  }

  async addFriend(userId: number, friendId: number): Promise<Follow> {
    const result = await this.prisma.follow.update({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: friendId,
        },
      },
      data: {
        status: PrismaFollowStatus.FRIEND,
      },
    });
    return toDomainFollow(result);
  }

  async getFollowers(userId: number): Promise<Follow[]> {
    const results = await this.prisma.follow.findMany({
      where: { followingId: userId },
    });
    return results.map(toDomainFollow);
  }

  async getFollowing(userId: number): Promise<Follow[]> {
    const results = await this.prisma.follow.findMany({
      where: { followerId: userId },
    });
    return results.map(toDomainFollow);
  }

  async getFriends(userId: number): Promise<Follow[]> {
    const results = await this.prisma.follow.findMany({
      where: {
        followerId: userId,
        status: PrismaFollowStatus.FRIEND,
      },
    });
    return results.map(toDomainFollow);
  }

  async updateFollowStatus(
    followerId: number,
    followingId: number,
    status: FollowStatus
  ): Promise<Follow> {
    const updated = await this.prisma.follow.update({
      where: {
        followerId_followingId: { followerId, followingId },
      },
      data: { status: status as PrismaFollowStatus },
    });

    return toDomainFollow(updated);
  }
}
