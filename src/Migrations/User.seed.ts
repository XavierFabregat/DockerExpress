import User from "../Models/User.model";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const users = [
  {
    id: uuidv4(),
    username: "admin",
    password: bcrypt.hashSync("admin", 10),
    avatarUrl: "https://i.imgur.com/4YK1Y0x.png",
  },
  {
    id: uuidv4(),
    username: "user",
    password: bcrypt.hashSync("user", 10),
    avatarUrl: "https://i.imgur.com/4YK1Y0x.png",
  },
  {
    id: uuidv4(),
    username: "guest",
    password: bcrypt.hashSync("guest", 10),
    avatarUrl: "https://i.imgur.com/4YK1Y0x.png",
  },
  {
    id: uuidv4(),
    username: "test",
    password: bcrypt.hashSync("test", 10),
    avatarUrl: "https://i.imgur.com/4YK1Y0x.png",
  },
];

export default async function seedUsers() {
  try {
    const createdUsers = await User.bulkCreate(users);
    console.log(createdUsers);
  } catch (error) {
    console.log("🚀 ~ file: User.seed.ts:37 ~ seedUsers ~ error:", error)
  }
};