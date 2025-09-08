
export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface LoreTopic {
  name: string;
  slug: string;
  description: string;
}
