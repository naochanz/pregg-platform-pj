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

export default function TermsPage() {
  return (
    <div className="container flex flex-col items-center justify-between min-h-screen px-4 py-12 mx-auto">
      <div className="w-full max-w-3xl">
        <div className="space-y-2 text-center mb-6">
          <h1 className="text-3xl font-bold">利用規約</h1>
          <p className="text-muted-foreground">
            最終更新日: 2025年3月22日
          </p>
        </div>

        <Card className="border-2 border-gray-200 shadow-md bg-white rounded-lg mb-8">
          <CardHeader>
            <CardTitle>PREGGサービス利用規約</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">1. はじめに</h2>
              <p>
                本利用規約（以下「本規約」といいます）は、当社が提供するPREGG（以下「本サービス」といいます）の利用条件を定めるものです。ユーザーの皆様（以下「ユーザー」といいます）には、本規約に同意いただいた上で、本サービスをご利用いただきます。
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">2. 定義</h2>
              <p>本規約において使用する用語の定義は、次の各号に定めるとおりとします。</p>
              <ul className="list-disc pl-6 mt-2">
                <li>「当社」とは、PREGGサービスを運営する会社を指します。</li>
                <li>「ユーザー」とは、本サービスを利用する個人または法人を指します。</li>
                <li>「専門家」とは、弁護士、税理士、公認会計士などの士業資格を持つ者を指します。</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">3. サービス内容</h2>
              <p>
                本サービスは、ユーザーと専門家をつなぐプラットフォームを提供します。ユーザーは本サービスを通じて、専門家に相談や依頼をすることができます。
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">4. 登録</h2>
              <p>
                本サービスの利用を希望する方は、本規約に同意の上、当社の定める方法により、利用登録を行う必要があります。当社は、当社の基準に従って、利用登録の可否を判断し、登録を認める場合にはその旨を通知します。
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">5. 禁止事項</h2>
              <p>ユーザーは、本サービスの利用にあたり、以下の行為を行ってはならないものとします。</p>
              <ul className="list-disc pl-6 mt-2">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社または第三者の知的財産権、プライバシー権、名誉権、その他の権利または利益を侵害する行為</li>
                <li>本サービスの運営を妨害するおそれのある行為</li>
                <li>不正アクセスまたは不正アクセスを試みる行為</li>
                <li>他のユーザーになりすます行為</li>
                <li>当社が許可しない方法での宣伝、広告、勧誘、または営業行為</li>
                <li>反社会的勢力に対する利益供与行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">6. サービスの停止</h2>
              <p>
                当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>本サービスにかかるシステムの保守点検または更新を行う場合</li>
                <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他、当社が本サービスの提供が困難と判断した場合</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">7. 責任の制限</h2>
              <p>
                当社は、本サービスの利用により発生したユーザーの損害について、一切の責任を負わないものとします。ただし、当社の故意または重大な過失による場合を除きます。
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">8. サービス内容の変更</h2>
              <p>
                当社は、ユーザーに通知することなく、本サービスの内容を変更したり、本サービスの提供を中止することができるものとします。当社が本サービスの提供を中止する場合、当社は可能な限りユーザーに対して事前に通知するよう努めます。
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">9. 利用規約の変更</h2>
              <p>
                当社は、本規約の内容を変更することができるものとします。本規約の変更後、本サービスの利用を継続することにより、ユーザーは変更後の規約に同意したものとみなされます。
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">10. 連絡または通知</h2>
              <p>
                ユーザーと当社との間の連絡または通知は、当社の定める方法によって行うものとします。当社は、ユーザーが登録したメールアドレスに連絡または通知を行うことがあり、この場合、ユーザーに通知が到達したものとみなします。
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">11. 準拠法と管轄裁判所</h2>
              <p>
                本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
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