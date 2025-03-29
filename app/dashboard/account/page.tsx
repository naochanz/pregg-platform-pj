// app/dashboard/account/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { accountFormSchema } from "@/lib/utils";
import { useSession } from "next-auth/react";

type AccountFormValues = z.infer<typeof accountFormSchema>;

export default function AccountPage() {
  const [isLoading, setIsLoading] = useState(false);

  // フォームの初期値
  const defaultValues: Partial<AccountFormValues> = {
    name: "山田 太郎",
    email: "yamada@example.com",
    phoneNumber: "",
    postalCode: "",
    prefecture: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    bio: "",
    website: "",
    company: "",
    position: "",
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
    console.log(status);
  }, [session, status]);

  // アカウント情報をAPIから取得
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch("/api/account");
        if (response.ok) {
          const accountData = await response.json();
          if (accountData && Object.keys(accountData).length > 0) {
            // APIから取得したデータでフォームを更新
            // ユーザー情報も含めて完全な実装にする際は、別のAPI呼び出しや統合が必要
            form.reset({
              ...defaultValues,
              ...accountData,
            });
          }
        }
      } catch (error) {
        console.error("アカウント情報の取得に失敗しました:", error);
        toast({
          variant: "destructive",
          title: "エラーが発生しました",
          description: "アカウント情報の読み込みに失敗しました。",
        });
      }
    };

    fetchAccountData();
  }, [form]);

  async function onSubmit(data: AccountFormValues) {
    setIsLoading(true);
    try {
      // APIにデータを送信
      const response = await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "保存に失敗しました");
      }

      toast({
        title: "プロフィール情報を更新しました",
      });
    } catch (error) {
      console.error("保存エラー:", error);
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description:
          error instanceof Error
            ? error.message
            : "プロフィール情報の保存に失敗しました。",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">アカウント情報</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
          <TabsTrigger value="security">セキュリティ</TabsTrigger>
          <TabsTrigger value="preferences">設定</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>プロフィール情報</CardTitle>
              <CardDescription>
                あなたの基本情報を入力してください。この情報は専門家とのマッチングに使用されます。
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>氏名</FormLabel>
                          <FormControl>
                            <Input placeholder="山田 太郎" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>メールアドレス</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="example@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>電話番号</FormLabel>
                        <FormControl>
                          <Input placeholder="090-1234-5678" {...field} />
                        </FormControl>
                        <FormDescription>
                          専門家からの連絡先として使用されます（任意）
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>郵便番号</FormLabel>
                          <FormControl>
                            <Input placeholder="123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="prefecture"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>都道府県</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="選択してください" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {prefectures.map((prefecture) => (
                                <SelectItem key={prefecture} value={prefecture}>
                                  {prefecture}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>市区町村</FormLabel>
                        <FormControl>
                          <Input placeholder="渋谷区" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>住所1</FormLabel>
                        <FormControl>
                          <Input placeholder="〇〇町1-2-3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>住所2</FormLabel>
                        <FormControl>
                          <Input placeholder="〇〇マンション101" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>自己紹介</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="あなた自身について教えてください"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          専門家とのマッチングに役立つ情報を入力してください
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>会社名</FormLabel>
                          <FormControl>
                            <Input placeholder="〇〇株式会社" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>役職</FormLabel>
                          <FormControl>
                            <Input placeholder="部長" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ウェブサイト</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>

                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center">
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        保存中...
                      </div>
                    ) : (
                      "保存する"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>セキュリティ設定</CardTitle>
              <CardDescription>
                アカウントのセキュリティに関する設定を行います。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">パスワード変更</h3>
                <p className="text-sm text-muted-foreground">
                  定期的にパスワードを変更することをおすすめします。
                </p>
                <Button variant="outline">パスワードを変更する</Button>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">二要素認証</h3>
                <p className="text-sm text-muted-foreground">
                  アカウントのセキュリティを高めるために二要素認証を設定できます。
                </p>
                <Button variant="outline">二要素認証を設定する</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>
                通知の受信方法や頻度を設定します。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">メール通知</h3>
                <p className="text-sm text-muted-foreground">
                  新着メッセージやシステム通知をメールで受け取ります。
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">設定を変更する</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 都道府県リスト
const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];
