import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./entities/admin.entity";
import { Repository, QueryFailedError } from "typeorm";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { genSalt, hash } from 'bcrypt'

@Injectable()
export class AdminService{
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>
  ){}

  //---------------------------------private methods
  private async validateRepeatPassword(password: string, repeatPassword: string): Promise<void>{
    if(password !== repeatPassword) throw new BadRequestException('The repeated password does not match the entered password')
  }

  private async hashPassword(password: string){
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)
    return hashedPassword
  }

  //---------------------------------public methods

  public async createNewAdmin(params: CreateAdminDto){
    await this.validateRepeatPassword(params.password, params.repeatPassword)
    const hashedPassword = await this.hashPassword(params.password)

    const newAdmin = this.adminRepository.create({
      userName: params.userName,
      email: params.email,
      password: hashedPassword,
    })

    try {
      return await newAdmin.save()
    } catch (error) {
      if(error instanceof QueryFailedError && error.driverError.code === '23505'){
        throw new BadRequestException('userName or email already exist')
      }
      throw error
    }
  }

  public async findAllAdmins(){
    const admins = await this.adminRepository.find({
      order: { createdAt: 'DESC' },
      select: {
        id: true,
        userName: true,
        email: true,
        avatar: true,
        role: true,
        isActive: true
      }
    })
    return admins
  }

  public async findAdminById(id: string){

    const admin = await this.adminRepository.find({
      where: { id },
      relations: [],   //added posts in relations
      select: {
        id: true,
        userName: true,
        email: true,
        avatar: true,
        role: true,
        isActive: true,
        //posts: true
      }
    })

    if(!admin) throw new NotFoundException('not found any admin with this ID')

    return admin
  }

  //---------------------------------export methods
}