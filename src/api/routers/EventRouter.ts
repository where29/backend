import { Request, Response, Router as expressRouter } from 'express';
import { EventController } from '../controller/EventController';
import { AuthenticateAndAuthorize } from '../middleware/AuthenticateAndAuthorize';
import { asyncHandler } from '../../utils/AsyncHandler';

export class EventRouter {
  readonly routes: expressRouter;

  constructor(
    private readonly controller: EventController,
    private readonly auth: AuthenticateAndAuthorize
  ) {
    this.routes = expressRouter();
    this.routes.use(this.auth.authenticate());
    this.setupRoutes();
  }

  private setupRoutes() {
    this.routes.post('/', asyncHandler((req: Request, res: Response) => this.controller.createEvent(req, res)));
    this.routes.get('/place/:placeId', asyncHandler((req: Request, res: Response) => this.controller.getEventsByPlace(req, res)));
    this.routes.get('/user/:userId', asyncHandler((req: Request, res: Response) => this.controller.getEventsByUser(req, res)));
  }
}
