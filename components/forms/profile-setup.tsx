import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { specialties } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function ProfileSetupForm() {
    const [step, setStep] = useState(1);
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [socialLinks, setSocialLinks] = useState<{ type: string; url: string }[]>([]);
    const [newLinkType, setNewLinkType] = useState("TWITTER");
    const [newLinkUrl, setNewLinkUrl] = useState("");

    const totalSteps = 3;

    const handleNextStep = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSpecialtyToggle = (specialtyId: string) => {
        if (selectedSpecialties.includes(specialtyId)) {
            setSelectedSpecialties(selectedSpecialties.filter(id => id !== specialtyId));
        } else {
            setSelectedSpecialties([...selectedSpecialties, specialtyId]);
        }
    };

    const handleAddSocialLink = () => {
        if (newLinkUrl.trim()) {
            setSocialLinks([...socialLinks, { type: newLinkType, url: newLinkUrl }]);
            setNewLinkUrl("");
        }
    };

    const handleRemoveSocialLink = (index: number) => {
        setSocialLinks(socialLinks.filter((_, i) => i !== index));
    };

    const socialTypeLabels: Record<string, string> = {
        TWITTER: "Twitter",
        FACEBOOK: "Facebook",
        LINKEDIN: "LinkedIn",
        INSTAGRAM: "Instagram",
        WEBSITE: "ウェブサイト",
        OTHER: "その他"
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>プロフィール設定</CardTitle>
                <CardDescription>
                    他の士業にあなたについて知ってもらいましょう (ステップ {step}/{totalSteps})
                </CardDescription>
            </CardHeader>
            <CardContent>
                {step === 1 && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bio">自己紹介</Label>
                            <Textarea
                                id="bio"
                                placeholder="あなたのバックグラウンドや専門分野、興味のある領域などを記入してください"
                                className="min-h-32"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="area">活動エリア</Label>
                            <Input id="area" placeholder="例: 東京都中央区" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="experience">経験年数</Label>
                            <Input id="experience" type="number" min="0" max="50" placeholder="例: 5" />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <div>
                            <Label>専門分野 (複数選択可)</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-3">
                                {specialties.map((specialty) => (
                                    <Button
                                        key={specialty.id}
                                        variant={selectedSpecialties.includes(specialty.id) ? "default" : "outline"}
                                        onClick={() => handleSpecialtyToggle(specialty.id)}
                                        className="justify-start"
                                    >
                                        {specialty.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <div>
                            <Label>SNSリンク</Label>
                            <div className="flex items-end space-x-2 mt-2">
                                <div className="w-1/3">
                                    <Select value={newLinkType} onValueChange={setNewLinkType}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(socialTypeLabels).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex-1">
                                    <Input
                                        placeholder="URLを入力"
                                        value={newLinkUrl}
                                        onChange={(e) => setNewLinkUrl(e.target.value)}
                                    />
                                </div>
                                <Button type="button" onClick={handleAddSocialLink}>
                                    追加
                                </Button>
                            </div>
                        </div>

                        {socialLinks.length > 0 && (
                            <div className="space-y-2">
                                <Label>追加済みリンク</Label>
                                <div className="space-y-2">
                                    {socialLinks.map((link, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                                            <div>
                                                <Badge>{socialTypeLabels[link.type]}</Badge>
                                                <span className="ml-2">{link.url}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveSocialLink(index)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                {step > 1 ? (
                    <Button variant="outline" onClick={handlePrevStep}>
                        戻る
                    </Button>
                ) : (
                    <div></div>
                )}
                {step < totalSteps ? (
                    <Button onClick={handleNextStep}>次へ</Button>
                ) : (
                    <Button>完了</Button>
                )}
            </CardFooter>
        </Card>
    );
}