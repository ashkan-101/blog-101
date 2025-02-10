import { Body, Controller, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { NotificationAdminService } from "../services/notification.admin.service";
import { CreateNotificationDto } from "../dtos/create-notification.dto";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";


@Controller('/api/v1/admin/notifications')
export class NotificationAdminController {
  constructor(
    private readonly notificationAdminService: NotificationAdminService
  ){}

  // @UseGuards(JwtAdminGuard)
  @Post(':userId')
  async sendForUser(@Param('userId', ParseUUIDPipe) userId: string, @Body() body: CreateNotificationDto){
    const newNotification = await this.notificationAdminService.createNotificationForUser(userId, body)
    return { newNotification }
  }
}