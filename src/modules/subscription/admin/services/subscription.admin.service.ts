import { Injectable } from "@nestjs/common";
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
}