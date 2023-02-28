export interface IPost {
  _id?: string;
  userId: any;
  content: string;
  image: string;
  public: boolean;
  rating: number;
  like: string[];
  time: number;
  placeId: any;
}
