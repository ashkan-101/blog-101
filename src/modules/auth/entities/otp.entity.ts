import { Column, Entity, BeforeInsert} from "typeorm";
import { BaseEntity } from "src/common/abstracts/base.entity";

@Entity('otp')
export class OtpEntity extends BaseEntity {

  @Column({type: 'varchar', nullable: false})
  mobile: string

  @Column({type: 'varchar', nullable: false})
  code: string

  @Column({type: 'timestamp', nullable: false})
  expiresAt: Date

  @BeforeInsert()
  setExpiresAt(){
    this.expiresAt = new Date(Date.now() + 2 * 60 * 1000)
  }
}