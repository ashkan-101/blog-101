import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { PostEntity } from "./post.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

@Entity('like-post')
export class LikePostEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, user => user.postLikes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, post => post.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post' })  
  post: PostEntity;
}