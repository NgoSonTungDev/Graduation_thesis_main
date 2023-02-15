export interface IPlace {
  _id?: string;
  name: string;
  location: string;
  address: string;
  geographicalLocation: string;
  price: number;
  purpose: string;
  type: string;
  rating: number;
  description: string;
  image: string[];
  openTime: number;
  closeTime: number;
}
