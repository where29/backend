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

  async createPlace(req: Request, res: Response) {
    try {
      const { placeId, name, latitude, longitude } = req.body;
      
      if (!placeId || !name || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ message: 'Missing required fields: placeId, name, latitude, longitude' });
      }

      // Check if place already exists
      const existingPlace = await this.placeService.getPlaceByPlaceId(placeId);
      if (existingPlace) {
        return res.status(200).json(existingPlace); // Return existing place
      }

      const place = await this.placeService.createPlace({
        placeId,
        name,
        latitude,
        longitude,
      });

      res.status(201).json(place);
    } catch (error) {
      console.error('Error creating place:', error);
      res.status(500).json({ message: 'Failed to create place' });
    }
  }

  async bulkCreatePlaces(req: Request, res: Response) {
    try {
      const { places } = req.body;
      
      if (!Array.isArray(places)) {
        return res.status(400).json({ message: 'Places must be an array' });
      }

      const createdPlaces = [];
      const errors = [];

      for (const placeData of places) {
        try {
          const { placeId, name, latitude, longitude } = placeData;
          
          if (!placeId || !name || latitude === undefined || longitude === undefined) {
            errors.push({ placeData, error: 'Missing required fields' });
            continue;
          }

          // Check if place already exists
          const existingPlace = await this.placeService.getPlaceByPlaceId(placeId);
          if (existingPlace) {
            createdPlaces.push(existingPlace);
            continue;
          }

          const place = await this.placeService.createPlace({
            placeId,
            name,
            latitude,
            longitude,
          });

          createdPlaces.push(place);
        } catch (error) {
          errors.push({ placeData, error: error instanceof Error ? error.message : 'Unknown error' });
        }
      }

      res.status(200).json({ 
        created: createdPlaces.length,
        places: createdPlaces,
        errors: errors
      });
    } catch (error) {
      console.error('Error bulk creating places:', error);
      res.status(500).json({ message: 'Failed to bulk create places' });
    }
  }
}
