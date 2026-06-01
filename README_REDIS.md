# Redis Integration for HireSenceBackend

This guide explains exactly where and how to implement Redis in the `HireSenceBackend` project.

## What you will add

1. `redis` dependency in `package.json`
2. Redis settings in `.env`
3. Redis connection helper in `config/redis.config.js`
4. Redis startup in `src/server.js`
5. Redis cache usage in `src/services/jobService.js`

## Step 1: Install Redis package

From `e:\HireSenceBackend\HireSenceBackend` run:

```bash
npm install redis
```

## Step 2: Add Redis env vars

Edit `HireSenceBackend/.env` and add:

```env
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
# REDIS_PASSWORD=
```

If Redis requires a password, set `REDIS_PASSWORD`.

## Step 3: Add Redis connection helper

Open `HireSenceBackend/config/redis.config.js` and add:

```js
import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis connected");
  }
};

export { redisClient };
```

## Step 4: Connect Redis on server start

Edit `HireSenceBackend/src/server.js` and add the Redis startup before the app starts listening.

Replace the current content with this exact code:

```js
import connectDB from '../config/db.config.js';
import { connectRedis } from '../config/redis.config.js';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

await connectRedis();
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

> Note: This project already uses `type: "module"` in `package.json`, so top-level `await` is supported.

## Step 5: Use Redis in job caching

Open `HireSenceBackend/src/services/jobService.js` and update it to import `redisClient` and cache the job list.

Replace the file content with this exact code:

```js
import Job from "../models/Job.js";
import { redisClient } from "../config/redis.config.js";

const JOBS_CACHE_KEY = "jobs:all";
const CACHE_TTL_SECONDS = 300;

export const createJobPosting = async (jobData, employerId) => {
  const job = await Job.create({
    ...jobData,
    postedBy: employerId,
  });

  if (redisClient.isOpen) {
    await redisClient.del(JOBS_CACHE_KEY);
  }

  return job;
};

export const getAllJobs = async () => {
  if (redisClient.isOpen) {
    const cached = await redisClient.get(JOBS_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  }

  const jobs = await Job.find();

  if (redisClient.isOpen) {
    await redisClient.set(JOBS_CACHE_KEY, JSON.stringify(jobs), {
      EX: CACHE_TTL_SECONDS,
    });
  }

  return jobs;
};

export const getJobById = async (jobId) => {
  const job = await Job.findById(jobId);
  return job;
};

export const updateJob = async (jobId, jobData) => {
  const updatedJob = await Job.findByIdAndUpdate(jobId, jobData, { new: true });

  if (redisClient.isOpen) {
    await redisClient.del(JOBS_CACHE_KEY);
  }

  return updatedJob;
};

export const deleteJob = async (jobId) => {
  const deletedJob = await Job.findByIdAndDelete(jobId);

  if (redisClient.isOpen) {
    await redisClient.del(JOBS_CACHE_KEY);
  }

  return deletedJob;
};

export const changeJobStatus = async (jobId, status) => {
  const updatedJob = await Job.findByIdAndUpdate(jobId, { status }, { new: true });

  if (redisClient.isOpen) {
    await redisClient.del(JOBS_CACHE_KEY);
  }

  return updatedJob;
};
```

## Step 6: Update `package.json` if needed

If you want the package list to include Redis, add this line under `dependencies` in `HireSenceBackend/package.json`:

```json
"redis": "^4.9.0"
```

## Step 7: Run Redis locally

Start Redis locally before you start the app:

- On Windows, use Redis for Windows if installed, or run the Redis server from WSL / Docker.
- Common command:

```bash
redis-server
```

## Step 8: Start the app

From `e:\HireSenceBackend\HireSenceBackend`:

```bash
npm install
npm run dev
```

## Where to add implementation

- `config/redis.config.js`: Redis client and connection logic
- `src/server.js`: connect Redis before app starts
- `src/services/jobService.js`: cache job list and invalidate on writes
- `.env`: Redis connection configuration
- `package.json`: install `redis`

## Optional next step

If you want Redis for session storage instead of caching, use `express-session` plus `connect-redis` and add middleware in `src/app.js`.

---

That is the exact implementation path for this project. If you want, I can also write the code into the files directly for you.