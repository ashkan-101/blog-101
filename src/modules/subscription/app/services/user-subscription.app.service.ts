import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserSubscriptionEntity } from "../../entities/user-subscription.entity";
import { Repository } from "typeorm";



@Injectable()
export class UserSubscriptionAppService{
  constructor(
    @InjectRepository(UserSubscriptionEntity)
    private readonly userSubscriptionRepository: Repository<UserSubscriptionEntity>
  ){}

  public async findUserSubscriptionsByUserId(userId: string){
    const subscriptions = await this.userSubscriptionRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }
    })
    return subscriptions
  }
}