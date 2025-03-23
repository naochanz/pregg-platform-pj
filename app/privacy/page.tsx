"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="container flex flex-col items-center justify-between min-h-screen px-4 py-12 mx-auto">
      <div className="w-full max-w-3xl">
        <div className="space-y-2 text-center mb-6">
          <h1 className="text-3xl font-bold">プライバシーポリシー</h1>
          <p className="text-muted-foreground">
            最終更新日: 2025年3月22日
          </p>
        </div>

        <Card className="border-2 border-gray-200 shadow-md bg-white rounded-lg mb-8">
          <CardHeader>
            <CardTitle>PREGGプライバシーポリシー</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">1. はじめに</h2>
              <p>
                本プライバシーポリシー（以下「本ポリシー」といいます）は、当社が運営するPREGG（以下「本サービス」といいます）における、ユーザーの個人情報の取扱いについて定めるものです。
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">2. 収集する情報</h2>
              <p>当社は、本サービスの提供にあたり、以下の情報を収集することがあります。</p>
              <ul className="list-disc pl-6 mt-2">
                <li>氏名、メールアドレス、パスワードなどの登録情報</li>
                <li>専門家の資格情報（弁護士、税理士、公認会計士など）</li>
                <li>本サービスの利用履歴</li>
                <li>IPアドレス、クッキー情報、アクセスログなどの技術情報</li>
                <li>その他、本サービスを通じてユーザーが提供する情報</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">3. 情報の利用目的</h2>
              <p>当社は、収集した情報を以下の目的で利用します。</p>
              <ul className="list-disc pl-6 mt-2">
                <li>本サービスの提供・運営</li>
                <li>ユーザーの認証</li>
                <li>ユーザーへの連絡や通知</li>
                <li>本サービスの改善や新機能の開発</li>
                <li>統計データの作成</li>
                <li>マーケティング活動</li>
                <li>法令に基づく対応</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">4. 情報の共有</h2>
              <p>
                当社は、以下の場合を除き、ユーザーの個人情報を第三者に開示または提供することはありません。
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>ユーザーの同意がある場合</li>
                <li>本サービスの提供に必要な範囲で業務委託先に提供する場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
                <li>合併、会社分割、事業譲渡その他の事由による事業の承継に伴って提供する場合</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">5. 情報の保護</h2>
              <p>
                当社は、ユーザーの個人情報の安全管理のために、適切な物理的、技術的、管理的な安全対策を講じます。具体的には、以下の対策を実施しています。
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>個人情報へのアクセス制限</li>
                <li>データの暗号化</li>
                <li>セキュリティ対策の定期的な見直しと改善</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">6. クッキーの使用</h2>
              <p>
                本サービスでは、ユーザー体験の向上やサービスの改善のために、クッキーを使用しています。ユーザーは、ブラウザの設定によりクッキーの受け入れを拒否することができますが、その場合、本サービスの一部の機能が利用できなくなる可能性があります。
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">7. ユーザーの権利</h2>
              <p>
                ユーザーは、当社に対して、自己の個人情報の開示、訂正、削除、利用停止を請求することができます。請求の方法については、当社の定める方法によるものとします。
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">8. 子どもの個人情報</h2>
              <p>
                本サービスは、13歳未満の子どもを対象としていません。当社は、13歳未満の子どもから意図的に個人情報を収集することはありません。13歳未満の子どもが当社に個人情報を提供していることが判明した場合、当社はその情報を直ちに削除するよう努めます。
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">9. プライバシーポリシーの変更</h2>
              <p>
                当社は、本ポリシーの内容を変更することがあります。重要な変更がある場合には、本サービス上での通知または登録されたメールアドレスへの連絡により、ユーザーに通知します。
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">10. お問い合わせ</h2>
              <p>
                本ポリシーに関するお問い合わせは、以下の連絡先までお願いします。
              </p>
              <p className="mt-2">
                会社名: PREGG株式会社<br />
                住所: 〒XXX-XXXX 東京都〇〇区〇〇 X-X-X<br />
                メールアドレス: privacy@pregg.example.com
              </p>
            </section>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/signup">アカウント登録に戻る</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">ホームに戻る</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}