// src/data/data-sources/FriendDataSourcePrisma.ts
import { PrismaClient } from '@prisma/client';
import { FriendRepository } from '../interfaces/FriendRepository';

const prisma = new PrismaClient();

export class FriendDataSourcePrisma implements FriendRepository {
  async followUser(followerId: number, followingId: number) {
    return await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  async addFriend(userId: number, friendId: number) {
    return await prisma.friend.create({
      data: {
        userId,
        friendId,
      },
    });
  }

  async getFriends(userId: number) {
    return await prisma.friend.findMany({
      where: {
        userId,
      },
      include: {
        friend: true,
      },
    });
  }
}
