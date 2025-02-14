import {Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisCacheService } from '../cache/redis-cache.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const key = this.generateCacheKey(request);

    const cachedData = await this.redisCacheService.getCache(key);

    if (cachedData) {
      return of(cachedData)
    }

    return next.handle().pipe(
      tap(async (data) => {
        await this.redisCacheService.setCache(key, data, 60000)
      }),
    );
  }

  private generateCacheKey(request: any): string {
    const userId = request.user.id
    const path = request.path
    return `cache_${userId}_${path}`;
  }
}