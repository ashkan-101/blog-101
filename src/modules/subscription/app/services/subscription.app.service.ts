import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubscriptionPlanEntity } from "../../entities/subscription-plan.entity";
import { Repository } from "typeorm";


@Injectable()
export class SubscriptionAppService{
  constructor(
    @InjectRepository(SubscriptionPlanEntity)
    private readonly subscriptionRepository: Repository<SubscriptionPlanEntity>
  ){}

  //---------------------------------public methods
  public async findAllSubscriptions(){
    const [subscriptions, totalPlans] = await this.subscriptionRepository.findAndCount({
      order: { durationDays: 'ASC' }
    })
    return { totalPlans, subscriptions}
  }

  //---------------------------------export methods
  public async findSubscriptionById(id: string){
    const subscription = await this.subscriptionRepository.findOne({
      where: { id }
    })
    return subscription
  }
}