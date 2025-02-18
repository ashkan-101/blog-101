import { BaseEntity } from "src/common/abstracts/base.entity";
import { SubscriptionPlanEntity } from "src/modules/subscription/entities/subscription-plan.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Entity, Column, ManyToOne, JoinTable } from "typeorm";


@Entity('payment')
export class PaymentEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false})
  authority: string

  @Column({ type: 'numeric', nullable: false })
  amount: number

  @ManyToOne(() => SubscriptionPlanEntity, subscription => subscription.payments, { onDelete: 'CASCADE' })
  @JoinTable({name: 'plan'})
  plan: SubscriptionPlanEntity

  @ManyToOne(() => UserEntity, user => user.payments, { onDelete: 'CASCADE' })
  @JoinTable({name: 'user'})
  user: UserEntity
}