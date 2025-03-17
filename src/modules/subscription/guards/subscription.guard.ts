import { Request } from 'express'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { UserSubscriptionAppService } from '../app/services/user-subscription.app.service'

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(
    private readonly UsersubscriptionService: UserSubscriptionAppService
  ){}


  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest<Request>()
    const userId = request.user?.id
    if(!userId) return true

    request.user_subscription = await this.UsersubscriptionService.getActiveSubscription(userId)
    return true
  } 
  
}