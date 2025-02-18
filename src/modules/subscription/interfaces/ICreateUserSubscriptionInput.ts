import { UserEntity } from "src/modules/user/entities/user.entity";
import { SubscriptionPlanEntity } from "../entities/subscription-plan.entity";


export interface ICreateUserSubscriptionInput{
  user: UserEntity,
  plan: SubscriptionPlanEntity,
  endDate: Date
}