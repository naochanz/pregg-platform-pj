"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Globe,
  Clock,
  Star,
  Calendar,
  MessageCircle,
  ArrowLeft,
  Briefcase,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// 資格、得意分野などのタグ用のコンポーネント
const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
      {children}
    </Badge>
  );
};

// レビュー表示用のコンポーネント
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : i < rating
              ? "text-yellow-400 fill-yellow-400 opacity-50"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};


export default function ExpertDetailPage() {
  const params = useParams();
  const [expert, setExpert] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 実際のアプリケーションではAPIからデータを取得
    // 現在はモックデータを使用
    const fetchExpert = async () => {
      try {
        // 本来はAPIからデータを取得する
        // const response = await fetch(`/api/experts/${params.id}`);
        // const data = await response.json();
        
        // モックデータを使用
        const mockExperts = [
          {
            id: 1,
            name: "佐藤 健太",
            profession: "弁護士",
            description: "企業法務・契約関連を専門とする弁護士。M&A、企業再編、知的財産権など幅広く対応可能です。クライアントのビジネス目標達成のためのパートナーとして10年以上の実務経験があります。",
            longDescription: "中小企業から大企業まで、さまざまな規模の企業の法務サポートを行ってきました。特に契約書のレビューや作成、企業間の紛争解決、知的財産権の保護について豊富な経験があります。依頼者の事業を深く理解し、ビジネスの成長に貢献する法的アドバイスを提供することを心がけています。",
            location: "東京都千代田区",
            address: "東京都千代田区丸の内1-2-3 丸の内ビル5階",
            office: "佐藤法律事務所",
            email: "kenta.sato@example.com",
            phone: "03-1234-5678",
            website: "https://sato-law.example.com",
            hourlyRate: "15,000",
            rating: 4.8,
            reviews: 32,
            specialties: ["企業法務", "M&A", "知的財産", "契約関連", "国際取引"],
            qualifications: ["弁護士（東京弁護士会）", "ニューヨーク州弁護士", "MBA取得"],
            experience: 12,
            education: "東京大学法学部卒業、ハーバードロースクール卒業（LL.M.）"
          },
          {
            id: 2,
            name: "鈴木 優子",
            profession: "税理士",
            description: "個人事業主・中小企業の税務顧問を多数担当。確定申告、節税対策、事業承継など幅広くサポートいたします。親切・丁寧な対応を心がけています。",
            longDescription: "創業支援から事業承継まで、事業のライフサイクル全体をサポートします。特に小規模事業者の方にとって、税務は負担になりがちです。私はクライアントの実情に合わせた実践的なアドバイスを提供し、事業の成長をサポートすることを使命としています。難しい税務用語をわかりやすく説明し、最適な選択肢を提示します。",
            location: "東京都新宿区",
            address: "東京都新宿区新宿3-4-5 新宿ビル8階",
            office: "鈴木税理士事務所",
            email: "yuko.suzuki@example.com",
            phone: "03-2345-6789",
            website: "https://suzuki-tax.example.com",
            hourlyRate: "10,000",
            rating: 4.9,
            reviews: 45,
            specialties: ["確定申告", "節税対策", "事業承継", "創業支援", "資金調達"],
            qualifications: ["税理士", "ファイナンシャルプランナー（FP1級）"],
            experience: 8,
            education: "慶應義塾大学経済学部卒業"
          },
          {
            id: 3,
            name: "田中 誠一",
            profession: "行政書士",
            description: "許認可申請・外国人ビザ手続きのエキスパート。会社設立、各種許認可申請、ビザ取得など行政手続きをサポート。迅速かつ確実な手続き処理が強みです。",
            longDescription: "外国人の在留資格（ビザ）取得支援に特化しており、特に企業向けの就労ビザや高度専門職ビザについて豊富な経験があります。また、飲食店や建設業などの許認可申請も得意としています。手続きの複雑さをシンプルに解説し、スムーズな申請をサポートします。多言語対応（英語・中国語）も可能です。",
            location: "東京都渋谷区",
            address: "東京都渋谷区渋谷1-2-3 渋谷センタービル3階",
            office: "田中行政書士事務所",
            email: "seiichi.tanaka@example.com",
            phone: "03-3456-7890",
            website: "https://tanaka-office.example.com",
            hourlyRate: "8,000",
            rating: 4.6,
            reviews: 28,
            specialties: ["ビザ申請", "会社設立", "建設業許可", "飲食店営業許可", "契約書作成"],
            qualifications: ["行政書士", "政府認定 申請取次行政書士", "宅地建物取引士"],
            experience: 6,
            education: "同志社大学法学部卒業"
          }
        ];
        
        // IDに基づいて専門家データを取得
        const foundExpert = mockExperts.find(e => e.id === Number(params.id));
        
        if (foundExpert) {
          setExpert(foundExpert);
        } else {
          toast({
            variant: "destructive",
            title: "エラーが発生しました",
            description: "専門家情報が見つかりませんでした",
          });
        }
      } catch (error) {
        console.error("専門家データの取得に失敗しました:", error);
        toast({
          variant: "destructive",
          title: "エラーが発生しました",
          description: "専門家情報の読み込みに失敗しました",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">専門家が見つかりませんでした</h2>
        <Button asChild>
          <Link href="/dashboard/search">
            <ArrowLeft className="mr-2 h-4 w-4" /> 検索に戻る
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/dashboard/search">
            <ArrowLeft className="mr-2 h-4 w-4" /> 検索結果に戻る
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 左カラム: プロフィール情報 */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-6 rounded-full mb-4">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{expert.name}</h2>
                <Badge className="mt-2 mb-4">{expert.profession}</Badge>
                <div className="flex items-center justify-center mb-4">
                  <StarRating rating={expert.rating} />
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({expert.reviews}件のレビュー)
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {expert.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {expert.office}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Award className="h-4 w-4 mr-1" />
                  実務経験 {expert.experience} 年
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    連絡先
                  </h3>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{expert.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{expert.phone}</span>
                    </div>
                    {expert.website && (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a
                          href={expert.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          ウェブサイト
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    料金
                  </h3>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">
                      相談料 {expert.hourlyRate}円/時間〜
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    専門分野
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {expert.specialties.map((specialty: string, index: number) => (
                      <Tag key={index}>{specialty}</Tag>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    資格
                  </h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {expert.qualifications.map((qualification: string, index: number) => (
                      <li key={index}>{qualification}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                予約する
              </Button>
              <Button variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                メッセージ
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* 右カラム: 詳細情報 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>プロフィール</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <section>
                  <h3 className="text-lg font-medium mb-2">経歴</h3>
                  <p className="text-gray-700">{expert.longDescription}</p>
                </section>

                <section>
                  <h3 className="text-lg font-medium mb-2">学歴・経歴</h3>
                  <p className="text-gray-700">{expert.education}</p>
                </section>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>レビュー</CardTitle>
              <CardDescription>
                クライアントからのフィードバック ({expert.reviews}件)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* レビューサンプル */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full p-2 mr-3">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">匿名ユーザー</h4>
                        <p className="text-xs text-muted-foreground">2023年10月</p>
                      </div>
                    </div>
                    <StarRating rating={5} />
                  </div>
                  <p className="text-sm">
                    とても丁寧に対応していただきました。専門的な内容をわかりやすく説明してくれて安心して相談できました。
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full p-2 mr-3">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">匿名ユーザー</h4>
                        <p className="text-xs text-muted-foreground">2023年9月</p>
                      </div>
                    </div>
                    <StarRating rating={4.5} />
                  </div>
                  <p className="text-sm">
                    迅速な対応と的確なアドバイスで助かりました。今後も継続的にお願いしたいと思います。
                  </p>
                </div>

                {/* もっと見るボタン */}
                <div className="text-center">
                  <Button variant="outline" size="sm">
                    すべてのレビューを見る
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>相談の流れ</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">
                    1
                  </span>
                  <div>
                    <h4 className="font-medium">予約の申し込み</h4>
                    <p className="text-sm text-muted-foreground">
                      希望日時を選択して予約を申し込みます。
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">
                    2
                  </span>
                  <div>
                    <h4 className="font-medium">予約確定</h4>
                    <p className="text-sm text-muted-foreground">
                      専門家からの確認後、予約が確定します。
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">
                    3
                  </span>
                  <div>
                    <h4 className="font-medium">相談</h4>
                    <p className="text-sm text-muted-foreground">
                      オンラインまたは対面で相談を行います。
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold mr-3">
                    4
                  </span>
                  <div>
                    <h4 className="font-medium">フォローアップ</h4>
                    <p className="text-sm text-muted-foreground">
                      必要に応じて追加相談や進捗確認を行います。
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
            <CardFooter>
              <Button className="w-full">今すぐ予約する</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}