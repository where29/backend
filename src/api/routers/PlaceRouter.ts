// src/api/routers/PlaceRouter.ts
import { Router } from 'express';
import { PlaceController } from '../controller/PlaceController';
import { asyncHandler } from '../../utils/AsyncHandler';

export class PlaceRouter {
  public routes: Router;

  constructor(private controller: PlaceController) {
    this.routes = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.routes.get('/', asyncHandler(this.controller.getAllPlaces.bind(this.controller)));
    this.routes.get('/:placeId', asyncHandler(this.controller.getPlaceById.bind(this.controller)));
  }
}
