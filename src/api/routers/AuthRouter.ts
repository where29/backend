import { Router } from 'express';
import { AuthController } from '../controller/AuthController';
import { asyncHandler } from '../../utils/AsyncHandler';

export class AuthRouter {
  public routes: Router;

  constructor(private controller: AuthController) {
    this.routes = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.routes.post('/signup', asyncHandler(this.controller.signUp.bind(this.controller)));
    this.routes.post('/signin', asyncHandler(this.controller.signIn.bind(this.controller)));
  }
}
