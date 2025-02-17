import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { SubscriptionPlanEntity } from "../../entities/subscription-plan.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSubscriptionDto } from "../dtos/create-subscription.dto";


@Injectable()
export class SubscriptionAdminService{
  constructor(
    @InjectRepository(SubscriptionPlanEntity)
    private readonly subscriptionPlanRepository: Repository<SubscriptionPlanEntity>
  ){}

  public async createNewSubscription(params: CreateSubscriptionDto){
    const createSubscription = this.subscriptionPlanRepository.create(params)

    return await createSubscription.save()
  }

  public async findAllSubscriptions(){
    const [subscriptions, totalPlans] = await this.subscriptionPlanRepository.findAndCount({
      order: { durationDays: 'ASC'}
    })

    return { totalPlans, subscriptions }
  }

  public async deleteSubscriptionById(id: string){
    const deleteResult = await this.subscriptionPlanRepository.delete({id})

    if(deleteResult.affected === 0) throw new NotFoundException('not found any subscription By this ID')
  }
}