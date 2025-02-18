import { Entity, Column, ManyToOne, JoinTable } from "typeorm";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { SubscriptionPlanEntity } from "./subscription-plan.entity";


@Entity('user-subscription')
export class UserSubscriptionEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, user => user.userSubscriptions, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'user' })
  user: UserEntity

  @ManyToOne(() => SubscriptionPlanEntity, subscription => subscription.usersSubscriptions, { onDelete: 'CASCADE'})
  @JoinTable({ name: 'plan' })
  plan: SubscriptionPlanEntity

  @Column({type: 'timestamp', nullable: false})
  endDate: Date

  @Column({ type: 'boolean', default: true})
  isActive: boolean
}