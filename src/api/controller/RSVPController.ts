// src/api/controller/RSVPController.ts
import { Request, Response } from 'express';
import { RSVPService } from '../../services/interfaces/RSVPService';
import { PlaceService } from '../../services/interfaces/PlaceService';

export class RSVPController {
  constructor(
    private readonly rsvpService: RSVPService,
    private readonly placeService: PlaceService
  ) {}

  async rsvpToEvent(req: Request, res: Response) {
    const userId = req.user?.id;
    const { placeId, eventId, dateTime, going, placeData } = req.body;
    
    if (!userId || (!placeId && !eventId) || !dateTime) {
      return res.status(400).json({ message: 'Missing data' });
    }

    // Ensure the place exists in the database before creating RSVP
    if (placeData && placeData.placeId) {
      try {
        const existingPlace = await this.placeService.getPlaceByPlaceId(placeData.placeId);
        
        if (!existingPlace) {
          const newPlace = await this.placeService.createPlace({
            placeId: placeData.placeId,
            name: placeData.name || 'Unknown Place',
            latitude: placeData.latitude || 0,
            longitude: placeData.longitude || 0,
          });
          
          // Use the newly created place's ID for the RSVP
          const rsvp = await this.rsvpService.upsertRSVP({
            userId,
            placeId: newPlace.id,
            eventId,
            dateTime: new Date(dateTime),
            going,
          });

          return res.status(200).json(rsvp);
        } else {
          // Use the existing place's ID for the RSVP
          const rsvp = await this.rsvpService.upsertRSVP({
            userId,
            placeId: existingPlace.id,
            eventId,
            dateTime: new Date(dateTime),
            going,
          });

          return res.status(200).json(rsvp);
        }
      } catch (error) {
        console.error('Error handling place creation:', error);
        return res.status(500).json({ message: 'Failed to ensure place exists' });
      }
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

  async getRSVPsByEvent(req: Request, res: Response) {
    const eventId = parseInt(req.params.eventId);
    const rsvps = await this.rsvpService.getRSVPsByEvent(eventId);
    res.status(200).json(rsvps);
  }

  async getRSVPsByEventAndPlace(req: Request, res: Response) {
    const eventId = parseInt(req.params.eventId);
    const placeId = parseInt(req.params.placeId);
    const rsvps = await this.rsvpService.getRSVPsByEventAndPlace(eventId, placeId);
    res.status(200).json(rsvps);
  }
}
