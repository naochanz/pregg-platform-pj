// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth";
// または auth.config.ts からインポートする場合
// import { handlers } from "@/auth.config";

export const { GET, POST } = handlers;