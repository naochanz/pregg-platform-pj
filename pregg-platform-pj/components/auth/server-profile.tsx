// app/components/auth/server-profile.tsx
import { auth } from "@/lib/auth";

export default async function ServerProfile() {
  const session = await auth();
  
  if (!session) {
    return <div>You are not authenticated</div>;
  }
  
  return <div>Welcome {session.user?.name}</div>;
}
