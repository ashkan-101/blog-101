import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisCacheService } from './redis-cache.service';
import { CacheInterceptor } from '../interceptors/cache.interceptor';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { createKeyv } from '@keyv/redis';
import { config } from 'dotenv';
config()

@Module({
  providers: [RedisCacheService, CacheInterceptor], 
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000})
            }),
            createKeyv(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`)
          ]
        }
      },
    }),
  ],
  exports: [RedisCacheService],
})
export class RedisModule {}