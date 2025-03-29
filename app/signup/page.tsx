"use client";
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { signupSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Avatar } from "@radix-ui/react-avatar";
import Image from "next/image";

const professionTypes = [
  { id: "LAWYER", label: "弁護士" },
  { id: "TAX_ACCOUNTANT", label: "税理士" },
  { id: "CPA", label: "公認会計士" },
  { id: "JUDICIAL_SCRIVENER", label: "司法書士" },
  { id: "ADMINISTRATIVE_SCRIVENER", label: "行政書士" },
  { id: "LABOR_CONSULTANT", label: "社会保険労務士" },
  { id: "PATENT_ATTORNEY", label: "弁理士" },
  { id: "REAL_ESTATE_APPRAISER", label: "不動産鑑定士" },
  { id: "LAND_SURVEYOR", label: "土地家屋調査士" },
  { id: "SME_CONSULTANT", label: "中小企業診断士" },
  { id: "OTHER", label: "その他" },
];

export default function SignupPage() {
  const { data: session } = useSession();
  console.log("session", session);

  const [isLoading, setIsloding] = useState(false);
  const form = useForm<z.infer<typeof signupSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      professionalType: "OTHER",
      termsAgreed: false,
    },
  });

  // signup.tsx の onSubmit 関数を修正
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setIsloding(true);
    try {
      const response = await fetch("/api/auth/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("data", data);
      console.log("response", response);

      if (response.ok) {
        toast({
          title: "アカウントを作成しました",
        });
        // アカウント作成成功後にダッシュボードページへリダイレクト
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: data.error,
        });
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
        toast({
          variant: "destructive",
          title: "エラーが発生しました",
          description: e.message,
        });
      } else {
        console.error(e);
        toast({
          variant: "destructive",
          title: "エラーが発生しました",
        });
      }
    } finally {
      setIsloding(false);
    }
  }

  const router = useRouter();

  return (
    <div className="container flex flex-col items-center justify-between min-h-screen px-4 py-12 mx-auto">
      <div className="w-full max-w-md">
        <div className="space-y-2 text-center mb-6">
          <h1 className="text-3xl font-bold">アカウント作成</h1>
          <p className="text-muted-foreground">
            PREGGで専門家とつながりましょう
          </p>
        </div>

        <Tabs defaultValue="google" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">メールアドレス</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <Card className="border-2 border-gray-200 shadow-md bg-white rounded-lg">
              <CardHeader>
                <CardTitle>メールアドレスで登録</CardTitle>
                <CardDescription>
                  アカウント情報を入力してください
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="name">氏名</FormLabel>
                            <Input
                              id="name"
                              placeholder="山田 太郎"
                              {...field}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="name">メールアドレス</FormLabel>
                            <Input
                              id="email"
                              type="email"
                              placeholder="example@example.com"
                              {...field}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="password">パスワード</FormLabel>
                            <Input {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="professionalType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="password">士業タイプ</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || ""}
                                defaultValue={field.value || ""}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="選択してください" />
                                </SelectTrigger>
                                <SelectContent>
                                  {professionTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col space-y-4">
                    <div className="flex items-center space-x-2 w-full">
                      <FormField
                        control={form.control}
                        name="termsAgreed"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                id="terms"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel htmlFor="terms" className="text-sm">
                                <span>
                                  <Link href="/terms" className="underline">
                                    利用規約
                                  </Link>
                                  と
                                  <Link href="/privacy" className="underline">
                                    プライバシーポリシー
                                  </Link>
                                  に同意します
                                </span>
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={form.formState.isSubmitting || isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center flex-row">
                          <span>
                            <Loader className="h-4 w-4 animate-spin mr-2" />
                          </span>
                          アカウント作成中...
                        </div>
                      ) : (
                        "アカウント作成"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>

          <TabsContent value="google">
            <Card className="border-2 border-gray-200 shadow-md bg-white rounded-lg">
              <CardHeader>
                <CardTitle>Googleで登録</CardTitle>
                <CardDescription>
                  Googleアカウントを使って簡単に登録できます
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {session ? (
                  <div className="flex items-center flex-row space-x-2">
                    <Image
                      alt="avatar"
                      src={session.user.image as string}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold"> {session.user.name}</p>
                      <p className="font-sm"> {session.user.email}</p>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => signIn("google")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Googleで続ける
                  </Button>
                )}
                <div className="space-y-2">
                  <Label htmlFor="profession-google">士業タイプ</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {professionTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <div className="flex items-center space-x-2 w-full">
                  <Checkbox id="terms-google" />
                  <Label htmlFor="terms-google" className="text-sm">
                    <span>
                      <Link href="/terms" className="underline">
                        利用規約
                      </Link>
                      と
                      <Link href="/privacy" className="underline">
                        プライバシーポリシー
                      </Link>
                      に同意します
                    </span>
                  </Label>
                </div>
                <Button className="w-full">次へ</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="text-center mt-8 mb-4">
        <p className="text-sm text-muted-foreground">
          すでにアカウントをお持ちですか？{" "}
          <Link href="/signin" className="underline">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
}
