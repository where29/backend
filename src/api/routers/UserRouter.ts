// src/api/routers/UserRouter.ts
import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { AuthenticateAndAuthorize } from '../middleware/AuthenticateAndAuthorize';
import { asyncHandler } from '../../utils/AsyncHandler';

export class UserRouter {
  public routes: Router;

  constructor(private controller: UserController, private auth: AuthenticateAndAuthorize) {
    this.routes = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.routes.get('/me', this.auth.authenticate(), asyncHandler(this.controller.getProfile.bind(this.controller)));
  }
}
