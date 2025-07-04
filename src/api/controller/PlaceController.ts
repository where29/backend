// src/api/controller/PlaceController.ts
import { Request, Response } from 'express';
import { PlaceService } from '../../services/interfaces/PlaceService';

export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  async getAllPlaces(_req: Request, res: Response) {
    const places = await this.placeService.getAllPlaces();
    res.status(200).json(places);
  }

  async getPlaceById(req: Request, res: Response) {
    const id = parseInt(req.params.placeId);
    const place = await this.placeService.getPlaceById(id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.status(200).json(place);
  }
}
