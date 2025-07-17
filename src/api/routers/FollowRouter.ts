import { Request, Response, Router as expressRouter } from 'express';
import { FollowController } from '../controller/FollowController';
import { AuthenticateAndAuthorize } from '../middleware/AuthenticateAndAuthorize';
import { asyncHandler } from '../../utils/AsyncHandler';

export class FollowRouter {
  readonly routes: expressRouter;

  constructor(
    private readonly controller: FollowController,
    private readonly auth: AuthenticateAndAuthorize
  ) {
    this.routes = expressRouter();
    this.routes.use(this.auth.authenticate());
    this.setupRoutes();
  }

  private setupRoutes() {
    this.routes.post('/follow', asyncHandler((req: Request, res: Response) => this.controller.followUser(req, res)));
    this.routes.post('/add', asyncHandler((req: Request, res: Response) => this.controller.addFriend(req, res)));
    this.routes.get('/followers/:userId', asyncHandler((req: Request, res: Response) => this.controller.getFollowers(req, res)));
    this.routes.get('/following/:userId', asyncHandler((req: Request, res: Response) => this.controller.getFollowing(req, res)));
  }
}
