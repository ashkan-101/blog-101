import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "src/modules/auth/app/dtos/register-user.dto";

@Injectable()
export class UserAppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ){}

  public async findUserByMobile(mobile: string){
    const user = await this.userRepository.findOne({where: {mobile}})
    if(!user) throw new NotFoundException('not found any user with this mobile')
    return user
  }

  public async createNewUserByMobile(mobile: string){
    const newUser = this.userRepository.create({mobile})
     return await newUser.save()
  }

  public async findUserById(userId: string){
    const user = await this.userRepository.findOne({where: { id: userId }})
    if(!user) throw new NotFoundException('not found any user with this Id')
    return user
  }
}