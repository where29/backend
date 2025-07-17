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
}
