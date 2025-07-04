export interface PlaceRepository {
  getAllPlaces(): Promise<any[]>;
  getPlaceById(id: number): Promise<any | null>;
}
