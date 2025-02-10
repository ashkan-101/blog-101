import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationEntity } from "../../entities/notification.entity";
import { Repository } from "typeorm";
import { UserAppFactory } from "../user.app.factory";


@Injectable()
export class NotificationAppService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ){}

  public async findNotificationsByUserId(userId: string){
    const [notifications, total] = await this.notificationRepository.findAndCount({
      where: { user: { id: userId }},
      order: { createdAt: 'DESC' },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true
      }
    })
    return { 
      notifications,
      total
    }
  }

  public async findNotificationById(id: string, userId: string){
    const notification = await this.notificationRepository.findOne({
      where: { id, user: { id: userId }},
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true
      }
    })

    if(!notification) throw new NotFoundException('not found any notification by this id')

    return notification
  }
}