import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, ArrowRight, MessageSquare, Search, Shield } from "lucide-react";
import { Testimonials } from "@/components/testimonials";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header/Navigation */}
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-gray-800" />
            <span className="ml-2 text-xl font-bold text-gray-900">PREGG</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="ghost">ログイン</Button>
            </Link>
            <Link href="/signup">
              <Button variant="default">無料登録</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              専門家同士の<span className="text-gray-800">協業</span>を、
              <br />もっとスマートに。
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              PREGGは、税理士、社労士、中小企業診断士など、
              <br />若手専門家のための相互相談・協業プラットフォームです。
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" variant="default">
                  無料で始める
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                サービスの詳細
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              専門家同士の協業をサポートする充実の機能
            </h2>
            <p className="text-gray-600">
              あなたのプロフェッショナルな活動をサポートする、使いやすい機能を提供します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Search className="h-12 w-12 text-gray-800 mb-4" />
              <h3 className="text-xl font-semibold mb-2">専門家検索</h3>
              <p className="text-gray-600">
                専門分野や地域から、必要な専門家を簡単に見つけることができます
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <MessageSquare className="h-12 w-12 text-gray-800 mb-4" />
              <h3 className="text-xl font-semibold mb-2">安全な相談</h3>
              <p className="text-gray-600">
                セキュアな環境で、専門家同士の相談や情報交換が可能です
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Shield className="h-12 w-12 text-gray-800 mb-4" />
              <h3 className="text-xl font-semibold mb-2">信頼の証明</h3>
              <p className="text-gray-600">
                資格確認済みの専門家のみが参加する、信頼性の高いプラットフォーム
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            専門家としての可能性を広げませんか？
          </h2>
          <p className="text-gray-300 mb-8">
            今なら無料で登録できます。専門家同士の新しいつながりを作りましょう。
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary">
              無料アカウントを作成
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-xl font-bold text-white">PREGG</span>
              </div>
              <p className="mt-4 text-sm">
                専門家同士の協業を促進し、<br />
                より良いサービスを提供するための<br />
                プラットフォーム
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">サービス</h3>
              <ul className="space-y-2 text-sm">
                <li>専門家検索</li>
                <li>相談機能</li>
                <li>プロフィール作成</li>
                <li>メッセージ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">会社情報</h3>
              <ul className="space-y-2 text-sm">
                <li>会社概要</li>
                <li><Link href="/terms" className="underline hover:text-primary">利用規約</Link></li>
                <li><Link href="/privacy" className="underline hover:text-primary">プライバシーポリシー</Link></li>
                <li>お問い合わせ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">ヘルプ</h3>
              <ul className="space-y-2 text-sm">
                <li>よくある質問</li>
                <li>ご利用ガイド</li>
                <li>セキュリティ</li>
                <li>お知らせ</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2025 PREGG All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
