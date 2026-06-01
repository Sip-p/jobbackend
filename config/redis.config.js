import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL  

export const redisClient = createClient({ url: REDIS_URL });

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis connected successfully 🔥');
    } catch (error) {
        console.warn('⚠️  Redis connection failed:', error.message);
        console.warn('Continuing without Redis. Some features may not work.');
    }
};
