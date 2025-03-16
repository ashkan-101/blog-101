import { 
  BadRequestException, Injectable, 
  HttpException, HttpStatus, 
  NotFoundException 
} from "@nestjs/common";
import { randomInt } from "crypto";
import { LessThan, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { compareSync, hashSync } from 'bcrypt'
import { OtpEntity } from "../entities/otp.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthAppFactory } from "./auth.app.factory";
import { GenerateCode } from "../types/GenerateCode";
import { SignInUserDto } from "./dtos/signIn-user.dto";
import { SMSService } from "src/common/services/notifications/sms/sms.service";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class AuthAppService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
    private readonly authAppFactory: AuthAppFactory,
    private readonly smsService: SMSService,
    private readonly jwtService: JwtService
  ){}

  //-------------------------------private methods
  @Cron('0 0 * * *', { timeZone: 'Asia/Tehran' })
  private async cleanupExpiredOtps() {
    const deleted = await this.otpRepository.delete({
      expiresAt: LessThan(new Date())
    });
    console.log(`Deleted ${deleted.affected} expired OTPs`);
  }

  private async validateExistOtpForNextRequest(mobile: string): Promise<void> {
    const otp = await this.otpRepository.findOne({
      where: { mobile }, 
      order: { createdAt : 'DESC' }
    })
    if(otp){
      const otpExpiredResult = await this.validateOtpExpiry(otp)
      if(otpExpiredResult) {
        throw new HttpException('too many request', HttpStatus.TOO_MANY_REQUESTS)
      }
    }
  }

  private async findOtpByMobile(mobile: string): Promise<OtpEntity>{
    const otp = await this.otpRepository.findOne({
      where: {mobile}, 
      order: {createdAt: 'DESC'}
    })

    if(!otp) {
      throw new NotFoundException('not found any otp with this phone number')
    }

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
  public async requestOtp(mobile: string){
    await this.validateExistOtpForNextRequest(mobile)

    const otpCode = await this.generateOtp()

    const newOtp = this.otpRepository.create({mobile, code: otpCode.hashedCode})
    await newOtp.save()

    // await this.smsService.sendSMS({
    //   to: mobile,
    //   message: `wellcom, this is one Time Password for signin ${otpCode.generatedCode}`
    // })

    return otpCode.generatedCode
  }

  public async verifyOtp(data: SignInUserDto){
    const otp = await this.findOtpByMobile(data.mobile)

    const compareOtp = compareSync(data.otpCode, otp.code) 
    if(!compareOtp){
      throw new BadRequestException('otp code is not correct')
    }

    const otpExpiredResult = await this.validateOtpExpiry(otp)
    if(!otpExpiredResult) {
      throw new BadRequestException('this otp has expired')
    }
    
    await this.otpRepository.delete({mobile: data.mobile , code: data.otpCode})
  }

  public async requestJwt(mobile: string){
    console.log(mobile);
    const user = await this.authAppFactory.findUserByMobile(mobile)
    if(!user){
      const newUser = await this.authAppFactory.createNewUserByMobile(mobile)
      return this.jwtService.sign({ userId: newUser.id })
    }
    else {
      return this.jwtService.sign({ userId: user.id })
    }
  }
}