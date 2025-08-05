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

  async getPlaceByPlaceId(placeId: string) {
    return await this.placeRepository.getPlaceByPlaceId(placeId);
  }

  async createPlace(data: {
    id?: number;
    placeId: string;
    name: string;
    latitude: number;
    longitude: number;
  }) {
    return await this.placeRepository.createPlace(data);
  }
}
