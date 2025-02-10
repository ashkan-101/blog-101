import { Controller } from "@nestjs/common";
import { CommentAppService } from "../services/comment.app.service";


@Controller()
export class CommentAppController {
  constructor(
    private readonly commentAppService: CommentAppService
  ){}
  
}