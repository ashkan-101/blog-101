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

  //-----------------------------------public methods
  public async findUserSubscriptionsByUserId(userId: string){
    const subscriptions = await this.userSubscriptionRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['plan'],
      select: {
        plan: {
          name: true,
          durationDays: true
        }
      }
    })
    return subscriptions
  }

  public async getActiveSubscription(userId: string): Promise<UserSubscriptionEntity | null>{
    const subscription = await this.userSubscriptionRepository.findOne({ 
      where: { user: { id: userId }, isActive: true },
      order: { createdAt: 'DESC' }, 
      relations: [ 'subscription' ]
    })

    if(!subscription) {
      return null
    }
    
    const currentDate = new Date()

    if(subscription.endDate < currentDate){
      subscription.isActive = false
      await this.userSubscriptionRepository.save(subscription)
      return null
    }

    return subscription
  }

  //-----------------------------------export methods

  public async createUserSubscription(params: UserSubscriptionEntity){
    const newUserSubscription = this.userSubscriptionRepository.create(params)
    return await newUserSubscription.save()
  }
}