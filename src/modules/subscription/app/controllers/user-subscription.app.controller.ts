import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserSubscriptionAppService } from "../services/user-subscription.app.service";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";


@Controller()
export class UserSubscriptionAppController{
  constructor(
    private readonly userSubscriptionAppService: UserSubscriptionAppService
  ){}

  @UseGuards(JwtAppGuard)
  @Get()
  async getUserSubscriptions(@Req() req){
    const userId = req.user.id
    const userSubscriptions = await this.userSubscriptionAppService.findUserSubscriptionsByUserId(userId)
    return { userSubscriptions }
  }
}