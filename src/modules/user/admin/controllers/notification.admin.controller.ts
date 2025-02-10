import { Body, Controller, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { NotificationAdminService } from "../services/notification.admin.service";
import { CreateNotificationDto } from "../dtos/create-notification.dto";
import { JwtAdminGuard } from "src/modules/auth/guards/jwt.admin.guard";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";


@Controller('/api/v1/admin/notifications')
export class NotificationAdminController {
  constructor(
    private readonly notificationAdminService: NotificationAdminService
  ){}

  @ApiOperation({ 
    summary: 'Send notification to a specific user',
    description: 'This endpoint allows an admin to send a notification to a user by their ID.'
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user to whom the notification will be sent.',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    description: 'Notification details that will be sent to the user',
    type: CreateNotificationDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Notification created successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @UseGuards(JwtAdminGuard)
  @Post(':userId')
  async sendForUser(@Param('userId', ParseUUIDPipe) userId: string, @Body() body: CreateNotificationDto){
    const newNotification = await this.notificationAdminService.createNotificationForUser(userId, body)
    return { newNotification }
  }
}