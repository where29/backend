import { Request, Response, Router as expressRouter } from 'express';
import { AuthController } from '../controller/AuthController';
import { asyncHandler } from '../../utils/AsyncHandler';

export class AuthRouter {
  readonly routes: expressRouter;

  constructor(private readonly controller: AuthController) {
    this.routes = expressRouter();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.routes.post('/signup', asyncHandler((req: Request, res: Response) => this.controller.signUp(req, res)));
    this.routes.post('/signin', asyncHandler((req: Request, res: Response) => this.controller.signIn(req, res)));
    this.routes.post('/refresh', asyncHandler((req: Request, res: Response) => this.controller.refreshToken(req, res)));
    this.routes.post('/logout', asyncHandler((req: Request, res: Response) => this.controller.logout(req, res)));
  }
}
