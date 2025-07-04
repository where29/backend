// src/data/data-sources/EventDataSourcePrisma.ts
import { PrismaClient } from '@prisma/client';
import { EventRepository } from '../interfaces/EventRepository';

const prisma = new PrismaClient();

export class EventDataSourcePrisma implements EventRepository {
  async createEvent(data: {
    title: string;
    description?: string;
    dateTime: Date;
    placeId: number;
    createdById: number;
  }) {
    return await prisma.event.create({
      data,
    });
  }

  async getEventsByPlace(placeId: number) {
    return await prisma.event.findMany({
      where: { placeId },
      orderBy: { dateTime: 'asc' },
    });
  }

  async getEventsByUser(userId: number) {
    return await prisma.event.findMany({
      where: { createdById: userId },
      orderBy: { dateTime: 'desc' },
    });
  }
}
