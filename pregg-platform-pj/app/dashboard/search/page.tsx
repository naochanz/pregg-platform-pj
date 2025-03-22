"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Search as SearchIcon,
  User,
  MapPin,
  Star,
  Filter,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [professionalType, setProfessionalType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0]);
  const [experienceFilter, setExperienceFilter] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      searchQuery,
      professionalType,
      priceRange,
      experienceFilter,
    });
    // 実際はここでAPIリクエストを行い、検索結果を取得します
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">専門家を探す</h1>

      {/* 検索バー（デスクトップ） */}
      <div className="hidden md:block">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <div className="flex-1">
            <Input
              placeholder="キーワードで検索（名前、専門分野など）"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select
            value={professionalType}
            onValueChange={setProfessionalType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="士業タイプ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LAWYER">弁護士</SelectItem>
              <SelectItem value="TAX_ACCOUNTANT">税理士</SelectItem>
              <SelectItem value="CPA">公認会計士</SelectItem>
              <SelectItem value="JUDICIAL_SCRIVENER">司法書士</SelectItem>
              <SelectItem value="ADMINISTRATIVE_SCRIVENER">行政書士</SelectItem>
              <SelectItem value="LABOR_CONSULTANT">社会保険労務士</SelectItem>
              <SelectItem value="PATENT_ATTORNEY">弁理士</SelectItem>
              <SelectItem value="REAL_ESTATE_APPRAISER">不動産鑑定士</SelectItem>
              <SelectItem value="LAND_SURVEYOR">土地家屋調査士</SelectItem>
              <SelectItem value="SME_CONSULTANT">中小企業診断士</SelectItem>
              <SelectItem value="OTHER">その他</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">
            <SearchIcon className="h-4 w-4 mr-2" />
            検索
          </Button>
        </form>
      </div>

      {/* 検索バー（モバイル） */}
      <div className="md:hidden">
        <form onSubmit={handleSearch} className="space-y-2">
          <Input
            placeholder="キーワードで検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <div className="flex space-x-2">
            <Select
              value={professionalType}
              onValueChange={setProfessionalType}
            >
              <SelectTrigger>
                <SelectValue placeholder="士業タイプ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LAWYER">弁護士</SelectItem>
                <SelectItem value="TAX_ACCOUNTANT">税理士</SelectItem>
                <SelectItem value="CPA">公認会計士</SelectItem>
                <SelectItem value="JUDICIAL_SCRIVENER">司法書士</SelectItem>
                <SelectItem value="ADMINISTRATIVE_SCRIVENER">行政書士</SelectItem>
                <SelectItem value="LABOR_CONSULTANT">社会保険労務士</SelectItem>
                <SelectItem value="PATENT_ATTORNEY">弁理士</SelectItem>
                <SelectItem value="REAL_ESTATE_APPRAISER">不動産鑑定士</SelectItem>
                <SelectItem value="LAND_SURVEYOR">土地家屋調査士</SelectItem>
                <SelectItem value="SME_CONSULTANT">中小企業診断士</SelectItem>
                <SelectItem value="OTHER">その他</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="flex-none">
              <SearchIcon className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* フィルターオプション */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {searchResults.length} 件の結果が見つかりました
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              フィルター
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>検索フィルター</SheetTitle>
              <SheetDescription>
                検索結果をフィルタリングします
              </SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="price-range">料金範囲（時間あたり）</Label>
                <div className="pt-2">
                  <Slider
                    id="price-range"
                    max={30000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>¥0</span>
                  <span>¥{priceRange[0].toLocaleString()}</span>
                  <span>¥30,000+</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="experience"
                    checked={experienceFilter}
                    onCheckedChange={(checked) => 
                      setExperienceFilter(checked as boolean)
                    }
                  />
                  <Label htmlFor="experience">
                    実務経験10年以上の専門家のみ表示
                  </Label>
                </div>
              </div>
              <Button className="w-full" onClick={() => console.log("フィルターを適用")}>
                フィルターを適用
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* 検索結果 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((expert) => (
          <Card key={expert.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-200 rounded-full p-3">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{expert.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Badge variant="outline" className="mr-2">
                        {expert.profession}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{expert.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm line-clamp-3">{expert.description}</p>
                </div>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {expert.location}
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-4 border-t">
                <div>
                  <p className="text-sm font-medium">相談料金</p>
                  <p className="text-sm">{expert.hourlyRate}円/時間〜</p>
                </div>
                <Button size="sm">詳細を見る</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ダミーの検索結果データ
const searchResults = [
  {
    id: 1,
    name: "佐藤 健太",
    profession: "弁護士",
    description: "企業法務・契約関連を専門とする弁護士。M&A、企業再編、知的財産権など幅広く対応可能です。クライアントのビジネス目標達成のためのパートナーとして10年以上の実務経験があります。",
    location: "東京都千代田区",
    hourlyRate: "15,000",
    rating: 4.8,
  },
  {
    id: 2,
    name: "鈴木 優子",
    profession: "税理士",
    description: "個人事業主・中小企業の税務顧問を多数担当。確定申告、節税対策、事業承継など幅広くサポートいたします。親切・丁寧な対応を心がけています。",
    location: "東京都新宿区",
    hourlyRate: "10,000",
    rating: 4.9,
  },
  {
    id: 3,
    name: "田中 誠一",
    profession: "行政書士",
    description: "許認可申請・外国人ビザ手続きのエキスパート。会社設立、各種許認可申請、ビザ取得など行政手続きをサポート。迅速かつ確実な手続き処理が強みです。",
    location: "東京都渋谷区",
    hourlyRate: "8,000",
    rating: 4.6,
  },
  {
    id: 4,
    name: "伊藤 真理",
    profession: "社会保険労務士",
    description: "人事・労務のプロフェッショナル。働き方改革対応、助成金申請、就業規則作成など、企業の人事労務をトータルでサポートします。複雑な労務問題も丁寧に解決します。",
    location: "大阪府大阪市",
    hourlyRate: "9,000",
    rating: 4.7,
  },
  {
    id: 5,
    name: "山本 隆",
    profession: "中小企業診断士",
    description: "経営戦略策定、事業計画作成、経営改善など中小企業の経営に関するあらゆる相談に対応。製造業からサービス業まで幅広い業種の支援実績があります。",
    location: "神奈川県横浜市",
    hourlyRate: "12,000",
    rating: 4.5,
  },
  {
    id: 6,
    name: "中村 大輔",
    profession: "弁理士",
    description: "特許・商標・意匠の出願代理、知的財産戦略の構築を得意としています。技術系のバックグラウンドを活かした専門的なアドバイスが強みです。",
    location: "愛知県名古屋市",
    hourlyRate: "13,000",
    rating: 4.4,
  },
];