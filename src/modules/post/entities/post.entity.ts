import { BaseEntity } from "src/common/abstracts/base.entity";
import { SubcategoryEntity } from "src/modules/category/entities/subcategory.entity";
import { Entity, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany } from "typeorm";

@Entity('post')
export class PostEntity extends BaseEntity{

  // @ManyToOne(() => UserPG, user => user.adminPosts, {onDelete: 'CASCADE'})
  // @JoinColumn({name: 'authorId'})
  // author!: IUserPG;

  @Column({type: 'varchar', nullable: false})
  title!: string;

  @Column({type: 'varchar', length: 70, nullable: true})
  metaTitle!: string;

  @Column({type: 'text', nullable: false})
  description!: string;

  @Column({type: 'varchar', length: 170, nullable: true})
  metaDescription!: string;

  @Column({type: 'varchar', nullable: true})
  thumbnail!: string;

  @Column({type: 'varchar', nullable: true})
  thumbnailAltText!: string;

  @Column({type: 'varchar', nullable: true})
  compressedThumbnail!: string;

  @Column({type: 'jsonb'})
  gallery!: string[];

  @Column({type: 'varchar', nullable: false})
  slug!: string;

  @ManyToOne(()=> SubcategoryEntity, subcategory => subcategory.posts, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'subcategory'})
  subcategory!: SubcategoryEntity;

  // @OneToMany(()=> CommentPG, comment => comment.post)
  // comments!: ICommentPG[];

  // @ManyToMany(()=> UserPG, user => user.favoritePosts)
  // favoriteBy!: UserPG[];

  @Column({type: 'int', default: 0})
  views!: number;

  @Column({type: 'jsonb', default: []})
  tags!: string[];

  // @Column({type: 'jsonb', default: []})
  // likes!: string[];
}