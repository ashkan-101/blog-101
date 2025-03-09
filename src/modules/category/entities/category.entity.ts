import { BaseEntity } from "src/common/abstracts/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { SubcategoryEntity } from "./subcategory.entity";

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column({type: 'varchar', nullable: false})
  title: string;

  @OneToMany(()=> SubcategoryEntity, subcategory => subcategory.category)
  subcategories: SubcategoryEntity[];
}