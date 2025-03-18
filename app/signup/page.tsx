import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const professionTypes = [
    { id: "lawyer", label: "弁護士" },
    { id: "accountant", label: "会計士" },
    { id: "taxAccountant", label: "税理士" },
    { id: "laborConsultant", label: "社会保険労務士" },
    { id: "patent", label: "弁理士" }
];

export default function SignupPage() {
    return (
        <div className="container flex items-center justify-center min-h-screen px-4 py-12 mx-auto">
            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">アカウント作成</h1>
                    <p className="text-muted-foreground">
                        PREGGで専門家とつながりましょう
                    </p>
                </div>

                <Tabs defaultValue="email" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="email">メールアドレス</TabsTrigger>
                        <TabsTrigger value="google">Google</TabsTrigger>
                    </TabsList>

                    <TabsContent value="email" className="h-[440px]">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>メールアドレスで登録</CardTitle>
                                <CardDescription>
                                    アカウント情報を入力してください
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">氏名</Label>
                                    <Input id="name" placeholder="山田 太郎" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">メールアドレス</Label>
                                    <Input id="email" type="email" placeholder="example@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">パスワード</Label>
                                    <Input id="password" type="password" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="profession">士業タイプ</Label>
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
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <Label htmlFor="terms" className="text-sm">
                                        <span>
                                            <Link href="/terms" className="underline">利用規約</Link>と
                                            <Link href="/privacy" className="underline">プライバシーポリシー</Link>に同意します
                                        </span>
                                    </Label>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">アカウント作成</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="google" className="h-[440px]">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Googleで登録</CardTitle>
                                <CardDescription>
                                    Googleアカウントを使って簡単に登録できます
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button variant="outline" className="w-full">
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
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms-google" />
                                    <Label htmlFor="terms-google" className="text-sm">
                                        <span>
                                            <Link href="/terms" className="underline">利用規約</Link>と
                                            <Link href="/privacy" className="underline">プライバシーポリシー</Link>に同意します
                                        </span>
                                    </Label>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" disabled>次へ</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        すでにアカウントをお持ちですか？{" "}
                        <Link href="/signin" className="underline">
                            ログイン
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}