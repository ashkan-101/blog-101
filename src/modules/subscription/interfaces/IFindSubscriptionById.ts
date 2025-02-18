import { SubscriptionPlanEntity } from "../entities/subscription-plan.entity";


export interface IFindSubscriptionById{
  findSubscriptionById(id: string): Promise<null | SubscriptionPlanEntity>
}