// src/data/data-sources/PlaceDataSourcePrisma.ts
import { PrismaClient } from '@prisma/client';
import { PlaceRepository } from '../interfaces/PlaceRepository';

const prisma = new PrismaClient();

export class PlaceDataSourcePrisma implements PlaceRepository {
  async getAllPlaces() {
    return await prisma.place.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getPlaceById(id: number) {
    return await prisma.place.findUnique({
      where: { id },
    });
  }
}
