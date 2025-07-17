import { Request, Response, Router as expressRouter } from 'express';
import { RSVPController } from '../controller/RSVPController';
import { AuthenticateAndAuthorize } from '../middleware/AuthenticateAndAuthorize';
import { asyncHandler } from '../../utils/AsyncHandler';

export class RSVPRouter {
  readonly routes: expressRouter;

  constructor(
    private readonly controller: RSVPController,
    private readonly auth: AuthenticateAndAuthorize
  ) {
    this.routes = expressRouter();
    this.routes.use(this.auth.authenticate());
    this.setupRoutes();
  }

  private setupRoutes() {
    this.routes.post('/', asyncHandler((req: Request, res: Response) => this.controller.rsvpToEvent(req, res)));
    this.routes.get('/place/:placeId', asyncHandler((req: Request, res: Response) => this.controller.getRSVPsByPlace(req, res)));
    this.routes.get('/user/:userId', asyncHandler((req: Request, res: Response) => this.controller.getRSVPsByUser(req, res)));
  }
}
