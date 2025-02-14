

export interface ICacheService {
  getCache(key: string): Promise<any>

  setCache(key: string, value: any, ttl?: number): Promise<void>

  deleteCache(key: string): Promise<void> 
}