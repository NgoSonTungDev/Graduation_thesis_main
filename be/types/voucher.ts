export interface IVoucher {
  _id?: string;
  codeVoucher: string;
  title: string;
  price: number;
  startDate: number;
  endDate: number;
  public: boolean;
  placeId: any;
}
