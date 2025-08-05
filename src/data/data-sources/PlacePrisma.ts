import { PrismaClient } from '@prisma/client';
import { PlaceRepository } from '../interfaces/PlaceRepository';

export class PlacePrisma implements PlaceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllPlaces() {
    return await this.prisma.place.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getPlaceById(id: number) {
    return await this.prisma.place.findUnique({
      where: { id },
    });
  }

  async getPlaceByPlaceId(placeId: string) {
    return await this.prisma.place.findUnique({
      where: { placeId },
    });
  }

  async createPlace(data: {
    id?: number;
    placeId: string;
    name: string;
    latitude: number;
    longitude: number;
  }) {
    return await this.prisma.place.create({
      data: {
        // Don't include id, let Prisma auto-increment it
        placeId: data.placeId,
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
  }
}
