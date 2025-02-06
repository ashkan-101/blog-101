import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./entities/admin.entity";
import { Repository } from "typeorm";


@Injectable()
export class AdminService{
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>
  ){}
}