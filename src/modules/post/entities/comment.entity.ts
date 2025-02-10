import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PostEntity } from "./post.entity";
import { BaseEntity } from "src/common/abstracts/base.entity";

@Entity('comment')
export class CommentEntity extends BaseEntity{

  @Column({type: 'varchar', nullable: false})
  title: string;

  @Column({type: 'varchar', length: 250, nullable: false})
  description: string;

  @ManyToOne(()=> UserEntity, user => user.comments, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'user'})
  user: UserEntity;
  
  @ManyToOne(() => PostEntity, post => post.comments, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'post'})
  post: PostEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.replies, {onDelete: 'CASCADE' })
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  replies: CommentEntity[];
}