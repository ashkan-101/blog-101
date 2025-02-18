import { BaseEntity } from "src/common/abstracts/base.entity";
import { Entity, Column } from "typeorm";


@Entity('payment')
export class PaymentEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false})
  authority: string

  @Column({ type: 'numeric', nullable: false })
  amount: number
}