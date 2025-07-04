// src/api/routers/FriendRouter.ts
import { Router } from 'express';
import { FriendController } from '../controller/FriendController';
import { AuthenticateAndAuthorize } from '../middleware/AuthenticateAndAuthorize';
import { asyncHandler } from '../../utils/AsyncHandler';

export class FriendRouter {
  public routes: Router;

  constructor(private controller: FriendController, private auth: AuthenticateAndAuthorize) {
    this.routes = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.routes.post('/follow', this.auth.authenticate(), asyncHandler(this.controller.followUser.bind(this.controller)));
    this.routes.post('/add', this.auth.authenticate(), asyncHandler(this.controller.addFriend.bind(this.controller)));
    this.routes.get('/followers/:userId', asyncHandler(this.controller.getFollowers.bind(this.controller)));
    this.routes.get('/following/:userId', asyncHandler(this.controller.getFollowing.bind(this.controller)));
    this.routes.get('/friends/:userId', asyncHandler(this.controller.getFriends.bind(this.controller)));
  }
}
