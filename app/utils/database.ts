import "dotenv/config";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export function insertData(id: string, feedback: object) {
  return new Promise(async (resolve, _reject) => {
    const data = await redis.hset(process.env.DATABASE_KEY as string, { [id]: feedback });
    if (!data) throw new  Error("data cannot be added");
    resolve(data);
  });
}