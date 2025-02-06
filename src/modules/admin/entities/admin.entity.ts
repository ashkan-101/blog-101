import { BaseEntity } from "src/common/abstracts/base.entity";
import { Column, Entity } from "typeorm";
import { AdminRole } from "../enums/AdminRole";


@Entity('admin')
export class AdminEntity extends BaseEntity {
  @Column({type: 'varchar', nullable: false})
  userName: string

  @Column({type: 'varchar', nullable: false})
  email: string

  @Column({type: 'varchar', nullable: false})
  password: string

  @Column({type: 'varchar', nullable: true})
  avatar: string

  @Column({type: 'enum', default: AdminRole.ADMIN})
  role: AdminRole 

  @Column({type: 'boolean', default: true})
  isActive: boolean

  // posts
}