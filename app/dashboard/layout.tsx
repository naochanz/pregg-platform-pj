"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  User,
  Settings,
  Search,
  Bell,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { signOut, useSession } from "next-auth/react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { data: session, status } = useSession();
  console.log("session: ", session);
  console.log("email: ", session?.user.email);
  const router = useRouter();

  const sidebarItems = [
    {
      title: "ダッシュボード",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "アカウント情報",
      href: "/dashboard/account",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "検索",
      href: "/dashboard/search",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: "設定",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* モバイル用サイドバートグル */}
      <div className="block lg:hidden absolute top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <MobileSidebar items={sidebarItems} pathname={pathname} />
          </SheetContent>
        </Sheet>
      </div>

      {/* デスクトップ用サイドバー */}
      <div
        className={`hidden lg:flex flex-col ${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-white border-r border-gray-200 transition-all duration-300`}
      >
        <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
          {!sidebarCollapsed && (
            <h1 className="text-2xl font-bold text-primary">PREGG</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={sidebarCollapsed ? "mx-auto" : ""}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <TooltipProvider>
            <ul className="space-y-1 px-2">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  {sidebarCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={`flex items-center justify-center p-2 text-sm rounded-md hover:bg-gray-100 ${
                            pathname === item.href
                              ? "bg-gray-100 text-primary font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          {item.icon}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100 ${
                        pathname === item.href
                          ? "bg-gray-100 text-primary font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </TooltipProvider>
        </nav>
        <div className="p-2 border-t border-gray-200">
          <TooltipProvider>
            {sidebarCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="w-full"
                  >
                    <Link href="/signin">
                      <LogOut className="h-5 w-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">ログアウト</TooltipContent>
              </Tooltip>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => signOut()}
              >
                ログアウト
                {/* <Link href="/signin">
                  <LogOut className="h-5 w-5 mr-2" />
                  ログアウト
                </Link> */}
              </Button>
            )}
          </TooltipProvider>
        </div>
      </div>

      {/* メインコンテンツエリア */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        {/* ヘッダー */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            ようこそ、{session?.user.name || "山田太郎"} さん
          </h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </header>

        {/* コンテンツ */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

function MobileSidebar({
  items,
  pathname,
}: {
  items: any[];
  pathname: string;
}) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary">PREGG</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100 ${
                  pathname === item.href
                    ? "bg-gray-100 text-primary font-medium"
                    : "text-gray-700"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/signin">
            <LogOut className="h-5 w-5 mr-2" />
            ログアウト
          </Link>
        </Button>
      </div>
    </div>
  );
}
