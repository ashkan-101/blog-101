import { BadRequestException, Injectable, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { AuthFactory } from "./auth.factory";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OtpEntity } from "./entities/otp.entity";
import { hashSync } from 'bcrypt'
import { randomInt } from "crypto";
import { GenerateCode } from "./types/GenerateCode";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
    private readonly authFactory: AuthFactory
  ){}

  //-------------------------------private methods
  private async findOtpByMobile(mobile: string): Promise<OtpEntity>{
    const otp = await this.otpRepository.findOne({where: {mobile}})
    
    if(!otp){
      throw new NotFoundException('not found any otp with this phone-number')
    }

    return otp
  }

  private async validateOtpExpiry(otp: OtpEntity): Promise<boolean>{
    if(otp.expiresAt < new Date(Date.now())) return false
    else return true
  }
  
  private async generateOtp(): Promise<GenerateCode>{
    const generatedCode = randomInt(10000, 99999).toString()
    const hashedCode = hashSync(generatedCode, 10)
    return {generatedCode, hashedCode}
  }

  //------------------------------------public methods
  public async createOtp(mobile: string){
    const otp = await this.findOtpByMobile(mobile)
    const otpExpiredResult = await this.validateOtpExpiry(otp)

    if(otpExpiredResult){
      throw new HttpException('too many request', HttpStatus.TOO_MANY_REQUESTS)
    }

    const otpCode = await this.generateOtp()

    const newOtp = this.otpRepository.create({mobile, code: otpCode.hashedCode})
    await newOtp.save()

    return otpCode.generatedCode
  }
}