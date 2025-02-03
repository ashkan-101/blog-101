import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity as Base} from "typeorm";

export abstract class BaseEntity extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}