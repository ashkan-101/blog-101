import { Injectable, NotFoundException } from "@nestjs/common";
import { ICreateUserSubscription } from "../subscription/interfaces/ICreateUserSubscription";
import { UserSubscriptionAppService } from "../subscription/app/services/user-subscription.app.service";
import { IFindSubscriptionById } from "../subscription/interfaces/IFindSubscriptionById";
import { SubscriptionAppService } from "../subscription/app/services/subscription.app.service";
import { ICreateUserSubscriptionInput } from "../subscription/interfaces/ICreateUserSubscriptionInput";


@Injectable()
export class PaymentFactory {
  private readonly createUserSubscription: ICreateUserSubscription
  private readonly findSubscription: IFindSubscriptionById
  constructor(
    userSubscriptionService: UserSubscriptionAppService,
    subscriptionService: SubscriptionAppService
  ){
    this.createUserSubscription = userSubscriptionService,
    this.findSubscription = subscriptionService
  }


  public async findSubscriptionById(id: string){
    const subscription = await this.findSubscription.findSubscriptionById(id)
    if(!subscription) {
      throw new NotFoundException('not found any subscription with this ID')
    }
    return subscription
  }

  public async createNewUserSubscription(params: ICreateUserSubscriptionInput){
    const newUserSubscription = await this.createUserSubscription.createUserSubscription(params)
    return newUserSubscription
  }

}