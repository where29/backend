import { PrismaClient } from '@prisma/client';
import { EventRepository } from '../interfaces/EventRepository';

export class EventPrisma implements EventRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createEvent(data: {
    title: string;
    description?: string;
    dateTime: Date;
    placeId: number;
    createdById: number;
  }) {
    return await this.prisma.event.create({ data });
  }

  async getEventsByPlace(placeId: number) {
    return await this.prisma.event.findMany({
      where: { placeId },
      orderBy: { dateTime: 'asc' },
    });
  }

  async getEventsByUser(userId: number) {
    return await this.prisma.event.findMany({
      where: { createdById: userId },
      orderBy: { dateTime: 'desc' },
    });
  }
}
