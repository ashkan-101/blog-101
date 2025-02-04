import { BaseEntity } from "src/common/abstracts/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CategoryEntity } from "./category.entity";


@Entity('subcategory')
export class SubcategoryEntity extends BaseEntity {

  @Column({type: 'varchar', nullable: false})
  title!: string;

  @ManyToOne(()=> CategoryEntity, category => category.subcategories, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'category'})
  category!: CategoryEntity;

  // @OneToMany(()=> PostPG, post => post.subcategory)
  // posts!: IPostPG[];

  // @ManyToMany(()=> UserPG, user => user.favoriteSubcategories)
  // folowingUsers!: IUserPG[]

}