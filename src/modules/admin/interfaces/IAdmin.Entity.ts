import { PostEntity } from "src/modules/post/entities/post.entity"
import { AdminRole } from "../enums/AdminRole"

export interface IAdminEntity {
  id: string
  userName: string
  email: string
  password: string
  avatar: string
  role: AdminRole 
  isActive: boolean
  posts: PostEntity[]
  createdAt: Date
  updatedAt: Date
}