import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { UserEntity } from "./user.entity";

@Entity('user-notification')
export class NotificationEntity extends BaseEntity {

  @Column({ type: 'varchar', nullable: false})
  title: string

  @Column({ type: 'text', nullable: false})
  description: string

  @Column({ type: 'varchar', nullable: true})
  thumbnail: {position: number, imagePath: string, imageName: string}

  @Column({ type: 'boolean', default: false})
  isSeen: boolean

  @ManyToOne(() => UserEntity, user => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'user'})
  user: UserEntity
}