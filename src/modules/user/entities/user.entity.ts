import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { LikePostEntity } from "src/modules/post/entities/likePost.entity";
import { PostReportEntity } from "src/modules/post/entities/postReport.entity";
import { CommentEntity } from "src/modules/post/entities/comment.entity";
import { NotificationEntity } from "./notification.entity";
import { UserSubscriptionEntity } from "src/modules/subscription/entities/user-subscription.entity";
import { PaymentEntity } from "src/modules/payment/entities/payment.entity";

@Entity('user')
export class UserEntity extends BaseEntity{
  @Column({type: 'varchar', length: 30, nullable: true})
  name: string;

  @Column({type: 'varchar', length: 11, nullable: false})
  mobile: string;

  @Column({type: 'text', nullable: true})
  avatar: string;

  @OneToMany(() => LikePostEntity, like => like.user)
  postLikes: LikePostEntity

  @OneToMany(() => PostReportEntity, (report) => report.user)
  postReports: PostReportEntity[];

  @OneToMany(() => CommentEntity, comment => comment.user)
  comments: CommentEntity[]

  @OneToMany(() => NotificationEntity, notification => notification.user)
  notifications: NotificationEntity

  @OneToMany(() => UserSubscriptionEntity, subscription => subscription.user)
  userSubscriptions: UserSubscriptionEntity[]

  @OneToMany(() => PaymentEntity, payment => payment.user)
  payments: PaymentEntity[]
}