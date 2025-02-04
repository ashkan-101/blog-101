import { Injectable } from "@nestjs/common";


@Injectable()
export class CategoryAdminService {
  constructor(
    private readonly categoryService: CategoryAdminService
  ){}

  
}