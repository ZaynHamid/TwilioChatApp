import { Injectable } from '@angular/core';
import { Client, Message } from '@twilio/conversations';

@Injectable({
  providedIn: 'root',
})
export class TwilioService {
  public client: Client | null = null;

  constructor() {
  }

  async initialize(token: string): Promise<void> {
    this.client = new Client(token);
  }

  async getConvoBySid(
    sid: string
  ): Promise<{ message: string; author: string; time: string }[]> {
    if (!this.client) {
      throw new Error('Twilio client is not initialized.');
    }

    try {
      const convo = await this.client.getConversationBySid(sid);
      console.log('Conversation Fetched Successfully!');

      const messages = await convo.getMessages();

      return messages.items.map((msg: Message) => ({
        message: msg.body ?? '',
        author: msg.author ?? '',
        time: msg.dateCreated?.toLocaleTimeString("en-us", {
          hour: '2-digit',
          minute: '2-digit', 
          hour12: true
        }) ?? ''
      }));
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }
  }

  async SendMessage(sid: string, message: string): Promise<any> {
    try {
      const convo = await this.client?.getConversationBySid(sid);
      if (convo) {
        await convo.sendMessage(message);
        console.log('MEssage sent');
      } else {
        console.log('error');
      }

    } catch (e) {
      console.log('Error: ', e);
    }
  }


}
