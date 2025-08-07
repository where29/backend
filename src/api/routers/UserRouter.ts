import { Request, Response, Router as expressRouter } from 'express';
import { UserController } from '../controller/UserController';
import { AuthenticateAndAuthorize } from '../middleware/AuthenticateAndAuthorize';
import { asyncHandler } from '../../utils/AsyncHandler';

export class UserRouter {
  readonly routes: expressRouter;

  constructor(
    private readonly controller: UserController,
    private readonly auth: AuthenticateAndAuthorize
  ) {
    this.routes = expressRouter();
    this.routes.use(this.auth.authenticate());
    this.setupRoutes();
  }

  private setupRoutes() {
    this.routes.get('/me', asyncHandler((req: Request, res: Response) => this.controller.getProfile(req, res)));
    this.routes.get('/search', asyncHandler((req: Request, res: Response) => this.controller.searchByEmail(req, res)));
  }
}
