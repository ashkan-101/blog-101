import { BaseEntity } from "src/common/abstracts/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { PostEntity } from "src/modules/post/entities/post.entity";


@Entity('subcategory')
export class SubcategoryEntity extends BaseEntity {

  @Column({type: 'varchar', nullable: false})
  title!: string;

  @ManyToOne(()=> CategoryEntity, category => category.subcategories, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'category'})
  category!: CategoryEntity;

  // @OneToMany(()=> PostEntity, post => post.subcategory)
  // posts!: PostEntity[];

  // @ManyToMany(()=> UserPG, user => user.favoriteSubcategories)
  // folowingUsers!: IUserPG[]

}