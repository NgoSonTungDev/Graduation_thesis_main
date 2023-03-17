export interface IPlace {
  _id?: string;
  name: string;
  location: string;
  address: string;
  geographicalLocation: string;
  startingPrice: number;
  LastPrice: number;
  purpose: string;
  type: string;
  rating: number;
  description: string;
  image: string[];
  favourite: string[];
  openTime: number;
  closeTime: number;
  statisticCmt: { _id: string; rateComments: boolean }[];
}
