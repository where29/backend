export interface PlaceService {
  getAllPlaces(): Promise<any[]>;
  getPlaceById(id: number): Promise<any | null>;
}