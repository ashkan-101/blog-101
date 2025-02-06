import { Controller } from "@nestjs/common";
import { PostAdminService } from "../services/Post.admin.service";


@Controller()
export class PostAdminController{
  constructor(
    private readonly postAdminService: PostAdminService
  ){}
}