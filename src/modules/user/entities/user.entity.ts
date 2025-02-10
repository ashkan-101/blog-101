import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/abstracts/base.entity";
import { LikePostEntity } from "src/modules/post/entities/likePost.entity";
import { PostReportEntity } from "src/modules/post/entities/postReport.entity";

@Entity('user')
export class UserEntity extends BaseEntity{
  @Column({type: 'varchar', length: 30, nullable: true})
  name!: string;

  @Column({type: 'varchar', length: 11, nullable: false})
  mobile!: string;

  @Column({type: 'text', nullable: true})
  avatar!: string;

  @OneToMany(() => LikePostEntity, like => like.user)
  postLikes: LikePostEntity
  // @ManyToMany(()=> SubcategoryPG, subcategory => subcategory.folowingUsers)
  // @JoinTable()
  // favoriteSubcategories!: ISubcategoryPG[]

  // @OneToMany(()=> CommentPG, comment => comment.user)
  // comment!: string[];

  // @OneToMany(() => CommentReplayPG, commentReplay => commentReplay.user)
  // commentReplies!: string[];

  // @ManyToMany(()=> PostPG, post => post.favoriteBy)
  // @JoinTable()
  // favoritePosts!: PostPG[];

  @OneToMany(() => PostReportEntity, (report) => report.user)
  postReports: PostReportEntity[];
}