import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationEntity } from "../../entities/notification.entity";
import { Repository } from "typeorm";
import { CreateNotificationDto } from "../dtos/create-notification.dto";
import { UserAdminFactory } from "../user.admin.factory";


@Injectable()
export class NotificationAdminService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    private readonly userAdminFactory: UserAdminFactory
  ){}

  public async createNotificationForUser(userId: string, params: CreateNotificationDto){
    const user = await this.userAdminFactory.findUserById(userId)
    if(!user) throw new NotFoundException('not found any user with this Id')

    const newNotification = this.notificationRepository.create({
      user,
      ...params
    })
    return await newNotification.save()
  }
}