import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { config } from "dotenv";
import { OtpEntity } from "src/modules/auth/entities/otp.entity";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { SubcategoryEntity } from "src/modules/category/entities/subcategory.entity";
import { AdminEntity } from "src/modules/admin/entities/admin.entity";
import { PostEntity } from "src/modules/post/entities/post.entity";
import { LikePostEntity } from "src/modules/post/entities/likePost.entity";
import { PostReportEntity } from "src/modules/post/entities/postReport.entity";
import { CommentEntity } from "src/modules/post/entities/comment.entity";
import { NotificationEntity } from "src/modules/user/entities/notification.entity";
import { SubscriptionPlanEntity } from "src/modules/subscription/entities/subscription-plan.entity";
import { UserSubscriptionEntity } from "src/modules/subscription/entities/user-subscription.entity";
import { PaymentEntity } from "src/modules/payment/entities/payment.entity";
config()

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT as unknown as number,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD as string,
  database: 'blog-101',
  synchronize: true,
  entities: [
    UserEntity, OtpEntity, 
    AdminEntity, PostEntity, 
    LikePostEntity, PostReportEntity,
    CategoryEntity, SubcategoryEntity,
    CommentEntity, NotificationEntity,
    SubscriptionPlanEntity, UserSubscriptionEntity,
    PaymentEntity
  ]
}