"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

export default function SignInPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });
      
            if (result?.error) {
              throw new Error(result.error);
            }
      
            toast({
              title: "ログインしました",
            });
            
            router.push("/dashboard");
            router.refresh();
          } catch (error) {
            console.error("ログインエラー:", error);
            toast({
              variant: "destructive",
              title: "ログインに失敗しました",
              description: "メールアドレスまたはパスワードが正しくありません",
            });
          } finally {
            setIsLoading(false);
          }
        };

        const handleGoogleLogin = async () => {
            setIsLoading(true);
            
            try {
              // Google認証を開始
              const result = await signIn('google', {
                redirect: false, // 自動リダイレクトを無効化
              });
              
              if (result?.error) {
                // 認証エラーが発生した場合
                toast({
                  variant: "destructive",
                  title: "ログインに失敗しました",
                  description: result.error
                });
                return;
              }
              
              // セッション情報を取得して、ユーザーのメールアドレスを確認
              const session = await getSession();
              
              if (!session || !session.user?.email) {
                toast({
                  variant: "destructive",
                  title: "ユーザー情報の取得に失敗しました",
                });
                return;
              }
              
              // メールアドレスをキーにユーザーの存在確認
              const email = session.user.email;
              const checkResponse = await fetch(`/api/auth/signup?email=${email}`);
              const checkData = await checkResponse.json();
              
              if (checkResponse.status === 200 && checkData.exists) {
                // ユーザーが既に存在する場合はダッシュボードにリダイレクト
                toast({
                  title: "ログインしました",
                });
                router.push("/dashboard");
              } else {
                // ユーザーが存在しない場合はサインアップページにリダイレクト
                toast({
                  title: "アカウント情報の登録が必要です",
                  description: "必要な情報を入力してください"
                });
                router.push("/signup");
              }
        } catch (error) {
            console.error("Googleログインエラー:", error);
            toast({
                variant: "destructive",
                title: "ログインに失敗しました",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container flex flex-col items-center justify-between min-h-screen px-4 py-12 mx-auto">
            <div className="w-full max-w-md">
                <div className="space-y-2 text-center mb-6">
                    <h1 className="text-3xl font-bold">ログイン</h1>
                    <p className="text-muted-foreground">
                        PREGGにログインして士業とつながりましょう
                    </p>
                </div>

                <Tabs defaultValue="email" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="email">メールアドレス</TabsTrigger>
                        <TabsTrigger value="google">Google</TabsTrigger>
                    </TabsList>

                    <TabsContent value="email">
                        <Card className="border-2 border-gray-200 shadow-md bg-white rounded-lg">
                            <CardHeader>
                                <CardTitle>メールアドレスでログイン</CardTitle>
                                <CardDescription>
                                    登録したメールアドレスとパスワードを入力してください
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handleEmailLogin}>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">メールアドレス</Label>
                                        <Input 
                                            id="email" 
                                            type="email" 
                                            placeholder="example@example.com" 
                                            required 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">パスワード</Label>
                                            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                                                パスワードをお忘れですか？
                                            </Link>
                                        </div>
                                        <Input 
                                            id="password" 
                                            type="password" 
                                            required 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="remember" 
                                            checked={rememberMe}
                                            onCheckedChange={(checked) => setRememberMe(checked === true)}
                                        />
                                        <Label htmlFor="remember" className="text-sm">ログイン状態を保持する</Label>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button 
                                        type="submit" 
                                        className="w-full" 
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center flex-row">
                                                <Loader className="h-4 w-4 animate-spin mr-2" />
                                                ログイン中...
                                            </div>
                                        ) : (
                                            "ログイン"
                                        )}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>

                    <TabsContent value="google">
                        <Card className="border-2 border-gray-200 shadow-md bg-white rounded-lg">
                            <CardHeader>
                                <CardTitle>Googleでログイン</CardTitle>
                                <CardDescription>
                                    Googleアカウントを使って簡単にログインできます
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button 
                                    variant="outline" 
                                    className="w-full"
                                    onClick={handleGoogleLogin}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center flex-row">
                                            <Loader className="h-4 w-4 animate-spin mr-2" />
                                            ログイン中...
                                        </div>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <div className="text-center mt-8 mb-4">
                <p className="text-sm text-muted-foreground">
                    アカウントをお持ちでないですか？{" "}
                    <Link href="/signup" className="underline">
                        新規登録
                    </Link>
                </p>
            </div>
        </div>
    );
}