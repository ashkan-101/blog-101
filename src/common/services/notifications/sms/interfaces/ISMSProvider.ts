import { ISMSMessage } from "./ISMSMessage";

export interface ISMSProvider{
  send(message: ISMSMessage): Promise<void>
}