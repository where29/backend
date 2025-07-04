// src/api/controller/RSVPController.ts
import { Request, Response } from 'express';
import { RSVPService } from '../../services/interfaces/RSVPService';

export class RSVPController {
  constructor(private readonly rsvpService: RSVPService) {}

  async rsvpToEvent(req: Request, res: Response) {
    const userId = req.user?.id;
    const { placeId, eventId, dateTime, going } = req.body;
    if (!userId || (!placeId && !eventId) || !dateTime) {
      return res.status(400).json({ message: 'Missing data' });
    }

    const rsvp = await this.rsvpService.upsertRSVP({
      userId,
      placeId,
      eventId,
      dateTime: new Date(dateTime),
      going,
    });

    res.status(200).json(rsvp);
  }

  async getRSVPsByPlace(req: Request, res: Response) {
    const placeId = parseInt(req.params.placeId);
    const rsvps = await this.rsvpService.getRSVPsByPlace(placeId);
    res.status(200).json(rsvps);
  }

  async getRSVPsByUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    const rsvps = await this.rsvpService.getRSVPsByUser(userId);
    res.status(200).json(rsvps);
  }
}
