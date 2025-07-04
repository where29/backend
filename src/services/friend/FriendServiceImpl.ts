import { FriendRepository } from '../../data/interfaces/FriendRepository';
import { FriendService } from '../interfaces/FriendService';

export class FriendServiceImpl implements FriendService {
  constructor(private readonly friendRepository: FriendRepository) {}

  async followUser(followerId: number, followingId: number) {
    return await this.friendRepository.followUser(followerId, followingId);
  }

  async addFriend(userId: number, friendId: number) {
    return await this.friendRepository.addFriend(userId, friendId);
  }

  async getFriends(userId: number) {
    return await this.friendRepository.getFriends(userId);
  }
}
