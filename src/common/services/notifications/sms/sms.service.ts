import { Inject, Injectable } from "@nestjs/common";
import { ISMSProvider } from "./interfaces/ISMSProvider";
import { ISMSMessage } from "./interfaces/ISMSMessage";


@Injectable()
export class SMSService {
  constructor(
    @Inject('ISMSProvider')
    private readonly smsProvider: ISMSProvider
  ){}

  async sendSMS(message: ISMSMessage){
    await this.smsProvider.send(message)
  }
}