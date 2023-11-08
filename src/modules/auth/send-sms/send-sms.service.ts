
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class InfobipService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.INFOBIP_API_KEY;
    this.baseUrl = process.env.INFOBIP_BASE_URL;
  }

  async sendSMS(phoneNumber: string, messages: string): Promise<any> {

    const data = {
      messages: [
        {
          destinations: [
            {
              to: phoneNumber
            }
          ],
          from: "Ollio app",
          text: messages
        }
      ]
    }

    const headers = {
      Authorization: `App ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    try {
      const response = await axios.post(this.baseUrl, data, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }


}