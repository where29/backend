export interface FriendRepository {
  followUser(followerId: number, followingId: number): Promise<any>;
  addFriend(userId: number, friendId: number): Promise<any>;
  getFriends(userId: number): Promise<any[]>;
}
