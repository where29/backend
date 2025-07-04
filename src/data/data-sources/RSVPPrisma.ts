// src/data/data-sources/RSVPDataSourcePrisma.ts
import { PrismaClient } from '@prisma/client';
import { RSVPRepository } from '../interfaces/RSVPRepository';

const prisma = new PrismaClient();

export class RSVPDataSourcePrisma implements RSVPRepository {
  async upsertRSVP(data: {
    userId: number;
    placeId?: number;
    eventId?: number;
    dateTime: Date;
    going: boolean;
  }) {
    return await prisma.rSVP.upsert({
      where: {
        userId_placeId_eventId_dateTime: {
          userId: data.userId,
          placeId: data.placeId ?? null,
          eventId: data.eventId ?? null,
          dateTime: data.dateTime,
        },
      },
      update: {
        going: data.going,
      },
      create: data,
    });
  }

  async getRSVPsByPlace(placeId: number) {
    return await prisma.rSVP.findMany({
      where: { placeId },
      include: { user: true, event: true },
    });
  }

  async getRSVPsByUser(userId: number) {
    return await prisma.rSVP.findMany({
      where: { userId },
      include: { place: true, event: true },
    });
  }
}
