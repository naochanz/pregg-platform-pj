"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

const settingsFormSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  theme: z.enum(["light", "dark", "system"], {
    required_error: "テーマを選択してください",
  }),
  language: z.enum(["ja", "en"], {
    required_error: "言語を選択してください",
  }),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export default function SettingsPage() {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      emailNotifications: true,
      marketingEmails: false,
      theme: "system",
      language: "ja",
    },
  });

  function onSubmit(data: SettingsFormValues) {
    toast({
      title: "設定を更新しました",
    });
    console.log(data);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">設定</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>通知設定</CardTitle>
            <CardDescription>
              メール通知の受信設定を管理します。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          システム通知
                        </FormLabel>
                        <FormDescription>
                          メッセージ、予約、ステータス更新などの通知を受け取ります。
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marketingEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          マーケティングメール
                        </FormLabel>
                        <FormDescription>
                          新機能や特典に関する情報を受け取ります。
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>テーマ</FormLabel>
                      <FormDescription>
                        アプリの表示テーマを選択してください。
                      </FormDescription>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="light" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              ライトモード
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="dark" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              ダークモード
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="system" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              システム設定に合わせる
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>言語</FormLabel>
                      <FormDescription>
                        アプリの表示言語を選択してください。
                      </FormDescription>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ja" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              日本語
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="en" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              English
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">設定を保存</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>アカウント削除</CardTitle>
            <CardDescription>
              アカウントを完全に削除します。この操作は取り消せません。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              アカウントを削除すると、すべての個人情報、予約履歴、メッセージ履歴が完全に削除されます。
              この操作は取り消すことができません。
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="destructive">アカウントを削除</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}