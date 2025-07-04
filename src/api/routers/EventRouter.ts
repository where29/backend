// src/api/routers/EventRouter.ts
import { Router } from 'express';
import { EventController } from '../controller/EventController';
import { AuthenticateAndAuthorize } from '../middleware/AuthenticateAndAuthorize';
import { asyncHandler } from '../../utils/AsyncHandler';

export class EventRouter {
  public routes: Router;

  constructor(private controller: EventController, private auth: AuthenticateAndAuthorize) {
    this.routes = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.routes.post('/', this.auth.authenticate(), asyncHandler(this.controller.createEvent.bind(this.controller)));
    this.routes.get('/place/:placeId', asyncHandler(this.controller.getEventsByPlace.bind(this.controller)));
    this.routes.get('/user/:userId', asyncHandler(this.controller.getEventsByUser.bind(this.controller)));
  }
}
