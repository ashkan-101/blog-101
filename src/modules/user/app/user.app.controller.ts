import { Controller } from "@nestjs/common";
import { UserAppService } from "./user.app.service";

@Controller('/api/v1/user')
export class UserAppController {
  constructor(
    private readonly userAppService: UserAppService
  ){}
  

}