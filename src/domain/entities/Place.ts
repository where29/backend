// src/domain/entities/Place.ts
export interface Place {
  id: number;
  name: string;
  location: string;
  description?: string;
  googlePlaceId?: string;
  createdByUserId?: number | null;
  createdAt: Date;
  updatedAt: Date;
}
