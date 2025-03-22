"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  Calendar,
  ChevronRight,
  Users,
  FileText,
  User,
} from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* プロフィール完了アラート */}
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-5 w-5 text-blue-500" />
        <AlertTitle className="text-blue-800">アカウント情報を完成させましょう</AlertTitle>
        <AlertDescription className="text-blue-700">
          プロフィール情報を充実させることで、より適切な専門家とマッチングできます。
          <Link href="/dashboard/account" className="ml-2 font-medium underline">
            アカウント詳細設定へ
          </Link>
        </AlertDescription>
      </Alert>

      {/* ダッシュボードカード */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>専門家を探す</CardTitle>
            <CardDescription>
              あなたのニーズに合った専門家を見つけましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <Users className="h-12 w-12 text-primary" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard/search">
                専門家を検索 <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>予約状況</CardTitle>
            <CardDescription>
              あなたの予約と相談スケジュール
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <Calendar className="h-12 w-12 text-primary" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              現在予約はありません
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              予約を確認 <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>書類と資料</CardTitle>
            <CardDescription>
              あなたの資料やドキュメントを管理
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <FileText className="h-12 w-12 text-primary" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              まだ資料はアップロードされていません
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              資料を管理 <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* おすすめ専門家 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">おすすめの専門家</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendedExperts.map((expert) => (
            <Card key={expert.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-200 rounded-full p-3">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{expert.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {expert.profession}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm">{expert.description}</p>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm">
                    詳細を見る
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ダミーデータ
const recommendedExperts = [
  {
    id: 1,
    name: "佐藤 健太",
    profession: "弁護士",
    description: "企業法務・契約関連を専門とする弁護士。10年以上の実務経験。",
  },
  {
    id: 2,
    name: "鈴木 優子",
    profession: "税理士",
    description: "個人事業主・中小企業の税務顧問を多数担当。節税対策に強み。",
  },
  {
    id: 3,
    name: "田中 誠一",
    profession: "行政書士",
    description: "許認可申請・外国人ビザ手続きのエキスパート。丁寧な対応が好評。",
  },
];