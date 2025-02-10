import { BaseEntity } from "src/common/abstracts/base.entity";
import { AdminEntity } from "src/modules/admin/entities/admin.entity";
import { SubcategoryEntity } from "src/modules/category/entities/subcategory.entity";
import { Entity, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany } from "typeorm";
import { PostImageType } from "../types/post.images.type";
import { LikePostEntity } from "./likePost.entity";
import { PostReport } from "./postReport.entity";

@Entity('post')
export class PostEntity extends BaseEntity{

  @ManyToOne(() => AdminEntity, admin => admin.posts, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'author'})
  author: AdminEntity;

  @Column({type: 'varchar', nullable: false})
  title: string;

  @Column({type: 'varchar', length: 70, nullable: true})
  metaTitle: string;

  @Column({type: 'text', nullable: false})
  description: string;

  @Column({type: 'varchar', length: 170, nullable: true})
  metaDescription: string;

  @Column({type: 'jsonb'})
  thumbnail: PostImageType;

  @Column({type: 'varchar', nullable: true})
  thumbnailAltText: string;

  @Column({type: 'jsonb'})
  gallery: PostImageType[];

  @Column({type: 'varchar', nullable: false})
  slug: string;

  @ManyToOne(()=> SubcategoryEntity, subcategory => subcategory.posts, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'subcategory'})
  subcategory: SubcategoryEntity;

  // @OneToMany(()=> CommentPG, comment => comment.post)
  // comments: ICommentPG[];

  // @ManyToMany(()=> UserPG, user => user.favoritePosts)
  // favoriteBy: UserPG[];

  @Column({type: 'int', default: 0})
  views: number;

  @Column({type: 'jsonb', default: []})
  tags: string[];

  @OneToMany(() => LikePostEntity, like => like.post)
  likes: LikePostEntity;

  @OneToMany(() => PostReport, (report) => report.post)
  reports: PostReport[];
}