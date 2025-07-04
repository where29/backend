// src/services/event/EventServiceImpl.ts
import { EventRepository } from '../../data/interfaces/EventRepository';
import { EventService } from '../interfaces/EventService';

export class EventServiceImpl implements EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async createEvent(data: {
    title: string;
    description?: string;
    dateTime: Date;
    placeId: number;
    createdById: number;
  }) {
    return await this.eventRepository.createEvent(data);
  }

  async getEventsByPlace(placeId: number) {
    return await this.eventRepository.getEventsByPlace(placeId);
  }

  async getEventsByUser(userId: number) {
    return await this.eventRepository.getEventsByUser(userId);
  }
}
