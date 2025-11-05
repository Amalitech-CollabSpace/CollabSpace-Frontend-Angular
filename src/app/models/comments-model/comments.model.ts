export interface Comment {
  taskId: string;
  authorId: string;
  content: string;
  authorName: string;
  createdAt?: Date;
}
