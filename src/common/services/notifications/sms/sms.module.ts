import { Module } from "@nestjs/common";
import { KaveNegar } from "./providers/KaveNegar";
import { SMSService } from "./sms.service";

@Module({
  providers: [
    SMSService,
    {
      provide: 'ISMSProvider',
      useClass: KaveNegar
    }
  ],
  exports: [SMSService]
})
export class SMSModule{}