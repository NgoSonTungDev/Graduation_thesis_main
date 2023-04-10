export interface IComment {
  userId: any;
  content: string;
  dateTime: number;
  like: string[];
  postId: string;
}

export interface IRepComment {
  userId: any;
  content: string;
  dateTime: number;
  like: string[];
  commentId: string;
  postId: string
}
