import { Controller } from "@nestjs/common";
import { PostAppService } from "../services/post.app.service";


@Controller()
export class PostAppController {
  constructor(
    private readonly postAppService: PostAppService
  ){}

  
}