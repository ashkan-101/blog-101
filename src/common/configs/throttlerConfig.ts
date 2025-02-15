import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis'
import { ExecutionContext } from '@nestjs/common'
import { seconds, ThrottlerModuleOptions } from '@nestjs/throttler'

export const throttlerConfig: ThrottlerModuleOptions = {
  throttlers: [{ name: 'limit', ttl: seconds(30), limit: 5 }],
  errorMessage: 'too many request',
  storage: new ThrottlerStorageRedisService({
    host: process.env.REDIS_HOST as string, 
    port: process.env.REDIS_PORT as unknown as number
  }),
  getTracker: (req: Record<string, any>, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.headers.authorization || request.ip
  }
}