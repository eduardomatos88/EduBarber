import { NextFunction, Request, Response } from 'express'
import IORedis from 'ioredis'
import { RateLimiterRedis } from 'rate-limiter-flexible'

import AppError from '@shared/errors/AppError'

import cacheConfig from '@config/cache'

const redisClient = new IORedis(cacheConfig.config.redis)

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rate-limit',
  points: 5,
  duration: 1,
})

async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(req.ip)
    return next()
  } catch (error) {
    throw new AppError('Too many requests', 429)
  }
}

export default rateLimiter
