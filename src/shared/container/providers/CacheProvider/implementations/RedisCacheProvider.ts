import IORedis, { Redis } from 'ioredis'

import cacheConfig from '@config/cache'

import ICacheProvider from '../models/ICacheProvider'

class RedisCacheProvider implements ICacheProvider {
  private client: Redis
  constructor() {
    this.client = new IORedis(cacheConfig.config.redis)
  }
  public async add(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }
  public async recover<T>(key: string): Promise<T | null> {
    const cache = await this.client.get(key)
    if (!cache) {
      return null
    }
    const parsedData = JSON.parse(cache)
    return parsedData
  }
  public async invalidadePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`)
    const pipeline = this.client.pipeline()
    keys.forEach(key => {
      pipeline.del(key)
    })
    await pipeline.exec()
  }
  public async invalidade(key: string): Promise<void> {
    await this.client.del(key)
  }
}

export default RedisCacheProvider
