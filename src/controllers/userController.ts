import UserModel from "../model/userModel";
import { cacheGet, cacheSet, cacheClear, cacheStats } from "../services/cacheService";
import { checkRateLimit } from "../services/rateLimitService";
import { enqueue } from "../services/queueService";
import { delay } from "../utils/delay";
import userModel from "../model/userModel";

export async function getUserById(req: any, res: any) {
  const id = req.params.id;

  if (!checkRateLimit(req.ip)) {
    return res.status(429).json({ message: "Too many requests" });
  }

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "Invalid user ID" });
  }

  const cached = cacheGet(id);
  if (cached) {
    console.log({ source: "cache", data: cached })
    return res.json({ source: "cache", data: cached });
  }

  const user = await enqueue(async () => {
    await delay(200);
    const dbUser = await UserModel.findById(id);
    if (dbUser) cacheSet(id, dbUser);
    return dbUser;
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ source: "database", data: user });
}





export async function getAllUser(req: any, res: any) {

  if (!checkRateLimit(req.ip)) {
    return res.status(429).json({ message: "Too many requests" });
  }


  const cached = cacheGet(req.ip);
  if (cached) {
    console.log({ source: "cache", data: cached })
    return res.json({ source: "cache", data: cached });
  }


  const user = await enqueue(async () => {
    await delay(200);
    const dbUser = await UserModel.find({});
    if (dbUser) cacheSet(req.ip, dbUser);
    return dbUser;
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ source: "database", data: user });
}





export async function createUser(req: any, res: any) {
  const { name, email } = req.body;


  if (!checkRateLimit(req.ip)) {
    return res.status(429).json({ message: "Too many requests" });
  }

  let isMatch = await userModel.findOne({ email })
  if (isMatch) return res.status(203).json({ message: "Email Already Registered" });


  const user = await UserModel.create({ name, email });
  cacheSet(String(user._id), user);

  res.json({ message: "User created", user });
}




export function clearCache(req: any, res: any) {
  cacheClear();
  res.json({ message: "Cache cleared" });
}

export function cacheStatus(req: any, res: any) {
  res.json(cacheStats());
}
