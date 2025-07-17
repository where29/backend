import { PrismaClient } from '@prisma/client';
import { RSVPRepository } from '../interfaces/RSVPRepository';

export class RSVPPrisma implements RSVPRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async upsertRSVP(data: {
    userId: number;
    placeId: number;
    eventId: number;
    dateTime: Date;
    going: boolean;
  }) {
    return await this.prisma.rSVP.upsert({
      where: {
        userId_placeId_eventId_dateTime: {
          userId: data.userId,
          placeId: data.placeId,
          eventId: data.eventId,
          dateTime: data.dateTime,
        },
      },
      update: {
        going: data.going,
      },
      create: {
        userId: data.userId,
        placeId: data.placeId,
        eventId: data.eventId,
        dateTime: data.dateTime,
        going: data.going,
      },
    });
  }

  async getRSVPsByPlace(placeId: number) {
    return await this.prisma.rSVP.findMany({
      where: { placeId },
      include: { user: true, event: true },
    });
  }

  async getRSVPsByUser(userId: number) {
    return await this.prisma.rSVP.findMany({
      where: { userId },
      include: { place: true, event: true },
    });
  }
}
