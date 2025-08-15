// src/services/rsvp/RSVPServiceImpl.ts
import { RSVPRepository } from '../../data/interfaces/RSVPRepository';
import { RSVPService } from '../interfaces/RSVPService';

export class RSVPServiceImpl implements RSVPService {
  constructor(private readonly rsvpRepository: RSVPRepository) {}

  async upsertRSVP(data: {
    userId: number;
    placeId?: number;
    eventId?: number;
    dateTime: Date;
    going: boolean;
  }) {
    return await this.rsvpRepository.upsertRSVP(data);
  }

  async getRSVPsByPlace(placeId: number) {
    return await this.rsvpRepository.getRSVPsByPlace(placeId);
  }

  async getRSVPsByUser(userId: number) {
    return await this.rsvpRepository.getRSVPsByUser(userId);
  }

  async getRSVPsByEvent(eventId: number) {
    return await this.rsvpRepository.getRSVPsByEvent(eventId);
  }

  async getRSVPsByEventAndPlace(eventId: number, placeId: number) {
    return await this.rsvpRepository.getRSVPsByEventAndPlace(eventId, placeId);
  }
}
