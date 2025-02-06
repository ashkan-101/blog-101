import { BadRequestException, Injectable, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { AuthAppFactory } from "./auth.app.factory";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OtpEntity } from "../entities/otp.entity";
import { compareSync, hashSync } from 'bcrypt'
import { randomInt } from "crypto";
import { GenerateCode } from "../types/GenerateCode";
import { LoginUserDto } from "./dtos/login-user.dto";

@Injectable()
export class AuthAppService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
    private readonly authAppFactory: AuthAppFactory
  ){}

  //-------------------------------private methods
  private async validateForCreateOtp(mobile: string): Promise<void> {
    const otp = await this.otpRepository.findOne({where: {mobile}, order: {createdAt : 'DESC'}})
    if(otp){
      const otpExpiredResult = await this.validateOtpExpiry(otp)
      if(otpExpiredResult) throw new HttpException('too many request', HttpStatus.TOO_MANY_REQUESTS)
    }
  }

  private async validateAndReturnOtp(mobile: string, otpCode: string): Promise<OtpEntity>{
    const otp = await this.otpRepository.findOne({where: {mobile}, order: {createdAt: 'DESC'}})
    if(!otp) throw new NotFoundException('not found any otp with this phone number')

    const compareOtp = compareSync(otpCode, otp.code)
    if(!compareOtp) throw new BadRequestException('otp code is not correct')
    return otp
  }

  private async validateOtpExpiry(otp: OtpEntity){
    if(otp.expiresAt < new Date(Date.now())){
      return false
    } else {
      return true
    }
  }
  
  private async generateOtp(): Promise<GenerateCode>{
    const generatedCode = randomInt(10000, 99999).toString()
    const hashedCode = hashSync(generatedCode, 10)
    return {generatedCode, hashedCode}
  }

  //------------------------------------public methods
  public async createOtp(mobile: string){
    await this.validateForCreateOtp(mobile)

    const otpCode = await this.generateOtp()

    const newOtp = this.otpRepository.create({mobile, code: otpCode.hashedCode})
    await newOtp.save()

    return otpCode.generatedCode
  }

  public async verifyOtp(data: LoginUserDto){
    const otp = await this.validateAndReturnOtp(data.mobile, data.otpCode)

    const otpExpiredResult = await this.validateOtpExpiry(otp)
    if(!otpExpiredResult) throw new BadRequestException('this otp has expired')
    
    await this.otpRepository.delete({mobile: data.mobile , code: data.otpCode})
  }

  public async returnUser(data: LoginUserDto){
    const user = await this.authAppFactory.validateUserByMobile(data.mobile)
    if(!user) return await this.authAppFactory.createNewUserByMobile(data.mobile)
    else return user
  }
}