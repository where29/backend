import { Request, Response, Router as expressRouter } from 'express';
import { PlaceController } from '../controller/PlaceController';
import { asyncHandler } from '../../utils/AsyncHandler';

export class PlaceRouter {
  readonly routes: expressRouter;

  constructor(private readonly controller: PlaceController) {
    this.routes = expressRouter();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.routes.get('/', asyncHandler((req: Request, res: Response) => this.controller.getAllPlaces(req, res)));
    this.routes.get('/:placeId', asyncHandler((req: Request, res: Response) => this.controller.getPlaceById(req, res)));
    this.routes.post('/', asyncHandler((req: Request, res: Response) => this.controller.createPlace(req, res)));
    this.routes.post('/bulk', asyncHandler((req: Request, res: Response) => this.controller.bulkCreatePlaces(req, res)));
  }
}
