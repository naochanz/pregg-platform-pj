import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    backendToken?: string;
    professionalType?: string;
  }
  
  interface Session {
    backendToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      backendToken?: string;
      professionalType?: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
    professionalType?: string;
  }
}