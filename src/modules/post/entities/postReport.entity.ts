import { BaseEntity } from "src/common/abstracts/base.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { PostEntity } from "./post.entity";


@Entity('post-report')
export class PostReportEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.postReports, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.reports, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post' })
  post: PostEntity;
}