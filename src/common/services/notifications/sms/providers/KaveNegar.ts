import { Injectable, Logger } from "@nestjs/common";
import { ISMSMessage } from "../interfaces/ISMSMessage";
import { ISMSProvider } from "../interfaces/ISMSProvider";
import axios from 'axios'


@Injectable()
export class KaveNegar implements ISMSProvider {
  private readonly logger = new Logger(KaveNegar.name)
  constructor(){}
  
  async send(message: ISMSMessage): Promise<void> {
    const apiKey: string = process.env.SMS_API_KEY as string
    const sender: string = process.env.SMS_SENDER as string
    const url = 'https://api.kavenegar.com/v1/613472435563797A37677331D/sms/send.json'
    try {
      const response = await axios.get(url, {
        params: {
          receptor: message.to,
          message: message.message,
          sender,
          apiKey
        }
      });
      
      if(response.data.return.status !== 200){
        this.logger.error(`failed to send SMS: ${response.data.return.message}`)
      }
    } catch (error) {
      this.logger.error(error.message + ':' + error.stack)
    }
  }
}