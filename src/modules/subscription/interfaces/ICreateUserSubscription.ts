import { UserSubscriptionEntity } from "../entities/user-subscription.entity";
import { ICreateUserSubscriptionInput } from "./ICreateUserSubscriptionInput";


export interface ICreateUserSubscription {
  createUserSubscription(params: ICreateUserSubscriptionInput): Promise<UserSubscriptionEntity>
}