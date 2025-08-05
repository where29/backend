export interface PlaceService {
  getAllPlaces(): Promise<any[]>;
  getPlaceById(id: number): Promise<any | null>;
  getPlaceByPlaceId(placeId: string): Promise<any | null>;
  createPlace(data: {
    id?: number;
    placeId: string;
    name: string;
    latitude: number;
    longitude: number;
  }): Promise<any>;
}