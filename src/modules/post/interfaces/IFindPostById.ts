import { PostEntity } from "../entities/post.entity";


export interface IFindPostById {
  findPostById(postId: string): Promise<PostEntity>
}