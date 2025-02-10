import { Controller, Get, Param, ParseUUIDPipe, Req, UseGuards } from "@nestjs/common";
import { NotificationAppService } from "../services/notification.app.service";
import { JwtAppGuard } from "src/modules/auth/guards/jwt.app.guard";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";


@Controller('/api/v1/notifications')
export class NotificationAppController {
  constructor(
    private readonly notificationAppService: NotificationAppService
  ){}

  @ApiOperation({
    summary: 'Get notifications for the authenticated user',
    description: 'This endpoint returns all notifications for the authenticated user, sorted by creation date in descending order.'
  })
  @ApiResponse({
    status: 200,
    description: 'Notifications retrieved successfully.',
  })
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

  @ApiOperation({
    summary: 'Get a specific notification by its ID',
    description: 'This endpoint allows the authenticated user to retrieve a specific notification by its ID.'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the notification to retrieve.',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Notification retrieved successfully.',
    schema: {
      example: {
        notification: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          title: 'New Message',
          description: 'You have received a new message.',
          createdAt: '2025-02-10T12:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Notification not found for the given ID or the user does not own this notification.',
  })
  @UseGuards(JwtAppGuard)
  @Get(':id')
  async getNotification(@Param('id', ParseUUIDPipe) id: string, @Req() req){
    const userId = req.user.id
    const notification = await this.notificationAppService.findNotificationById(id, userId)

    return { notification }
  }

}