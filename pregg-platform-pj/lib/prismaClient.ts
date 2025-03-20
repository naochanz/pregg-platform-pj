import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connect() {
  try {
    await prisma.$connect();
    console.log(`🔌Connected to database`);
  } catch (error) {
    return Error("Error connecting to database");
  }
}
