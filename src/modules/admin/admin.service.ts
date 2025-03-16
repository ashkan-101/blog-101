import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./entities/admin.entity";
import { Repository, QueryFailedError } from "typeorm";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { genSalt, hash } from 'bcrypt'
import { UpdateAdminDto } from "./dtos/update-admin.dto";
import { AdminRole } from "./enums/AdminRole";
import { config } from "dotenv";
config()

@Injectable()
export class AdminService implements OnModuleInit{
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>
  ){}
  async onModuleInit() {
    const superAdmin = await this.adminRepository.findOne({
      where: { role: AdminRole.SUPERADMIN }
    })

    if(!superAdmin){
      const hashedPassword = await this.hashPassword( process.env.SUPERADMIN_PASSWORD as string )
      const newSuperAdmin = this.adminRepository.create({
        userName: process.env.SUPERADMIN_USERNAME,
        email: process.env.SUPERADMIN_EMAIL,
        password: hashedPassword,
        role: AdminRole.SUPERADMIN
      })
      await newSuperAdmin.save()
    }
  }

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
    if(!id){
      throw new BadRequestException('please enter valid Id')
    }
    const admin = await this.adminRepository.findOne({
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

  public async toggleAdminStatusById(id: string){
    const updateResult = await this.adminRepository.update(id, {
      isActive: () => 'NOT isActive',
    });
    if (updateResult.affected === 0) throw new NotFoundException('not found any admin with this ID');
  }
 
  public async deleteAdminById(id: string){
    const deleteResult = await this.adminRepository.delete({ id })
    if(deleteResult.affected === 0) throw new NotFoundException('not found any admin with dis ID')
  }

  public async updateAdminById(id: string, params: UpdateAdminDto){
    try {
      const updateResult = await this.adminRepository.update({id}, params)
      if(updateResult.affected === 0) throw new NotFoundException('not found any admin with this ID')
    } catch (error) {
      if(error instanceof QueryFailedError && error.driverError.code === '23505'){
        throw new BadRequestException('this userName or email already exist')
      }
      throw error
    }
  }

  public async findAdminByEmail(email: string){
    const admin = await this.adminRepository.findOne({
      where: { email },
      relations: [],   //added posts in relations
      select: {
        id: true,
        userName: true,
        email: true,
        avatar: true,
        role: true,
        isActive: true,
        password: true
        //posts: true
      }
    })

    if(!admin) throw new NotFoundException('not found any admin with this email')
    
    return admin
  }
}