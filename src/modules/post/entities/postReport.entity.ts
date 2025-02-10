import { BaseEntity } from "src/common/abstracts/base.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { PostEntity } from "./post.entity";


@Entity()
export class PostReportEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.postReports)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.reports)
  @JoinColumn({ name: 'post' })
  post: PostEntity;
}