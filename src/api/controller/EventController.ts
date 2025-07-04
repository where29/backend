// src/api/controller/EventController.ts
import { Request, Response } from 'express';
import { EventService } from '../../services/interfaces/EventService';

export class EventController {
  constructor(private readonly eventService: EventService) {}

  async createEvent(req: Request, res: Response) {
    const userId = req.user?.id;
    const { title, description, dateTime, placeId } = req.body;

    if (!userId || !title || !dateTime || !placeId) {
      return res.status(400).json({ message: 'Missing data' });
    }

    const event = await this.eventService.createEvent({
      title,
      description,
      dateTime: new Date(dateTime),
      placeId,
      createdById: userId,
    });

    res.status(201).json(event);
  }

  async getEventsByPlace(req: Request, res: Response) {
    const placeId = parseInt(req.params.placeId);
    const events = await this.eventService.getEventsByPlace(placeId);
    res.status(200).json(events);
  }

  async getEventsByUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    const events = await this.eventService.getEventsByUser(userId);
    res.status(200).json(events);
  }
}
