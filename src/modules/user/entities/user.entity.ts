import { Column, Entity } from "typeorm";
import { BaseEntity } from "src/common/abstracts/base.entity";

@Entity('user')
export class UserEntity extends BaseEntity{
  @Column({type: 'varchar', length: 30, nullable: true})
  name!: string;

  @Column({type: 'varchar', length: 11, nullable: false})
  mobile!: string;

  @Column({type: 'text', nullable: true})
  avatar!: string;

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
}