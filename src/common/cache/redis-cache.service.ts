import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ICacheService } from './interfaces/ICache.Service';

@Injectable()
export class RedisCacheService implements ICacheService{
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCache(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  async setCache(key: string, value: any, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async deleteCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

}