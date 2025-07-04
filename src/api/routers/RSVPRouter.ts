// src/api/routers/RSVPRouter.ts
import { Router } from 'express';
import { RSVPController } from '../controller/RSVPController';
import { AuthenticateAndAuthorize } from '../middleware/AuthenticateAndAuthorize';
import { asyncHandler } from '../../utils/AsyncHandler';

export class RSVPRouter {
  public routes: Router;

  constructor(private controller: RSVPController, private auth: AuthenticateAndAuthorize) {
    this.routes = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.routes.post('/', this.auth.authenticate(), asyncHandler(this.controller.rsvpToEvent.bind(this.controller)));
    this.routes.get('/place/:placeId', asyncHandler(this.controller.getRSVPsByPlace.bind(this.controller)));
    this.routes.get('/user/:userId', asyncHandler(this.controller.getRSVPsByUser.bind(this.controller)));
  }
}
