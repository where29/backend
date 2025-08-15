export interface RSVPRepository {
  upsertRSVP(data: {
    userId: number;
    placeId?: number;
    eventId?: number;
    dateTime: Date;
    going: boolean;
  }): Promise<any>;

  getRSVPsByPlace(placeId: number): Promise<any[]>;
  getRSVPsByUser(userId: number): Promise<any[]>;
  getRSVPsByEvent(eventId: number): Promise<any[]>;
  getRSVPsByEventAndPlace(eventId: number, placeId: number): Promise<any[]>;
}
