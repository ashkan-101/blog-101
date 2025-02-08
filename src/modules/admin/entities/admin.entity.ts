import { BaseEntity } from "src/common/abstracts/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { AdminRole } from "../enums/AdminRole";
import { PostEntity } from "src/modules/post/entities/post.entity";


@Entity('admin')
export class AdminEntity extends BaseEntity {
  @Column({type: 'varchar', nullable: false, unique: true})
  userName: string

  @Column({type: 'varchar', nullable: false, unique: true})
  email: string

  @Column({type: 'varchar', nullable: false})
  password: string

  @Column({type: 'varchar', nullable: true})
  avatar: string

  @Column({type: 'varchar', default: AdminRole.ADMIN})
  role: AdminRole 

  @Column({type: 'boolean', default: true})
  isActive: boolean

  @OneToMany(() => PostEntity, post => post.author)
  posts: PostEntity[]

}