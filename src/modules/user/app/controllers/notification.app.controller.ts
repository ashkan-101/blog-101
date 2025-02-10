import { Controller, Get, Param, ParseUUIDPipe, Req, UseGuards } from "@nestjs/common";
import { NotificationAppService } from "../services/notification.app.service";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";


@Controller('/api/v1/notifications')
export class NotificationAppController {
  constructor(
    private readonly notificationAppService: NotificationAppService
  ){}

  @UseGuards(JwtAppGuard)
  @Get()
  async getNotifications(@Req() req){
    const userId = req.user.id
    const {notifications , total} = await this.notificationAppService.findNotificationsByUserId(userId)
    return { 
      total,
      notifications
     }
  }

  @UseGuards(JwtAppGuard)
  @Get(':id')
  async getNotification(@Param('id', ParseUUIDPipe) id: string, @Req() req){
    const userId = req.user.id
    const notification = await this.notificationAppService.findNotificationById(id, userId)

    return { notification }
  }

}