import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { UserSubscriptionEntity } from "./user-subscription.entity";


@Entity('subscription')
export class SubscriptionPlanEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'numeric', nullable: false})
  price: number

  @Column({ type: 'numeric', nullable: false})
  durationDays: number

  @OneToMany(() => UserSubscriptionEntity, userSubscription => userSubscription.plan)
  usersSubscriptions: UserSubscriptionEntity[]
}