export interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  type: 'sent' | 'received';
  code?: string;
}