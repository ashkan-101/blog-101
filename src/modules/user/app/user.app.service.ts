import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "src/modules/auth/dtos/register-user.dto";

@Injectable()
export class UserAppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}

  public async findUserByMobile(mobile: string){
    return await this.userRepository.findOne({where: {mobile}})
  }

  public async createNewUserByMobile(mobile: string){
    const newUser = this.userRepository.create({mobile})
     return await newUser.save()
  }

  public async findUserById(userId: string){
    return await this.userRepository.findOne({where: { id: userId }})
  }
}