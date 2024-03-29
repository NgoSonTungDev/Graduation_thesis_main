export interface IOrder {
  _id?: string;
  codeOrder: string;
  adultTicket: number;
  childTicket: number;
  total: number;
  amount: number;
  description: string;
  status: number; //1 Chờ xác nhận , 2 Đã xác nhận , 3 Đã hủy , 4 Đã thanh toán
  dateTime: number;
  userId: any;
  placeId: any;
  salesAgentId: any;
  ticketId: any;
}
