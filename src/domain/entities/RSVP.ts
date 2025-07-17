// src/domain/entities/RSVP.ts
export interface RSVP {
  id: number;
  userId: number;
  placeId: number;
  eventId?: number | null;
  timestamp: Date; // when the user plans to go
  createdAt: Date;
}
