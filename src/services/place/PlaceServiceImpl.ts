// src/services/place/PlaceServiceImpl.ts
import { PlaceRepository } from '../../data/interfaces/PlaceRepository';
import { PlaceService } from '../interfaces/PlaceService';

export class PlaceServiceImpl implements PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async getAllPlaces() {
    return await this.placeRepository.getAllPlaces();
  }

  async getPlaceById(id: number) {
    return await this.placeRepository.getPlaceById(id);
  }
}
