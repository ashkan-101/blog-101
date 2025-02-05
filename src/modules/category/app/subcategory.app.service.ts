import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SubcategoryEntity } from "../entities/subcategory.entity";

@Injectable()
export class SubcategoryAppService {
  constructor(
    @InjectRepository(SubcategoryEntity)
    private readonly subcategoryRepository: Repository<SubcategoryEntity>
  ){}
}