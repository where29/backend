export interface EventRepository {
  createEvent(data: {
    title: string;
    description?: string;
    dateTime: Date;
    placeId: number;
    createdById: number;
  }): Promise<any>;

  getEventsByPlace(placeId: number): Promise<any[]>;
  getEventsByUser(userId: number): Promise<any[]>;
}
