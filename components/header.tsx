// components/layout/header.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();
  // モック用にログイン状態を仮定
  const isLoggedIn = true;
  const user = { name: "山田 太郎", image: "https://i.pravatar.cc/150?img=1" };

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="text-xl font-bold">
          PREGG
        </Link>

        <nav className="hidden space-x-6 md:flex">
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            ダッシュボード
          </Link>
          <Link
            href="/search"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            検索
          </Link>
          <Link
            href="/requests"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            リクエスト
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative w-8 h-8 rounded-full"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>UT</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    プロフィール
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="w-full">
                    設定
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/signin" className="w-full">
                    ログアウト
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="ghost">ログイン</Button>
              </Link>
              <Link href="/signup">
                <Button>登録</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
