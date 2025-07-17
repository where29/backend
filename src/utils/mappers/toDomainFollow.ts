import { Follow as DomainFollow } from '../../domain/entities/Follow';
import { FollowStatus as DomainFollowStatus } from '../../domain/entities/FollowStatus';
import { Follow as PrismaFollow, FollowStatus as PrismaFollowStatus } from '@prisma/client';

/**
 * Maps a Prisma Follow record to the domain Follow entity.
 * Note: `id` is not a real field in the Prisma model since you're using a composite key.
 *       We'll assign a placeholder value (-1) or omit it from domain logic if unnecessary.
 */
export function toDomainFollow(prismaFollow: PrismaFollow): DomainFollow {
  return {
    followerId: prismaFollow.followerId,
    followingId: prismaFollow.followingId,
    status: prismaFollow.status as DomainFollowStatus,
    createdAt: prismaFollow.createdAt,
  };
}
