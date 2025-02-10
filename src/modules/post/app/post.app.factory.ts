import { Injectable } from "@nestjs/common";
import { IFindPostById } from "../interfaces/IFindPostById";
import { PostAppService } from "./services/post.app.service";

@Injectable()
export class PostAppFactory {
  private readonly findPost: IFindPostById
  constructor(postAppService: PostAppService){
    this.findPost = postAppService
  }

  public async findPostById(postId: string){
    return await this.findPost.findPostById(postId)
  }
}